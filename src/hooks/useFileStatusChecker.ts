import { useEffect, useRef, useState } from "react";

interface FileWithStatus {
  createdAt: string | Date;
  state: string;
}

interface UseFileStatusCheckerParams<T extends FileWithStatus> {
  files: T[];
  fetchFiles: () => Promise<void>;
  isProgressState: (status: string) => boolean;
  storageKey: string; // 세션 스토리지 키
}

const AUTO_CLEAR_DELAY = 10000; // 5초 후 자동으로 상태 제거

export function useFileStatusChecker<T extends FileWithStatus>({
  files,
  fetchFiles,
  isProgressState,
  storageKey,
}: UseFileStatusCheckerParams<T>) {
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fetchFilesRef = useRef(fetchFiles);
  const filesRef = useRef(files);

  // ref 업데이트
  fetchFilesRef.current = fetchFiles;
  filesRef.current = files;

  // 가장 최근 업로드된 파일의 상태를 확인
  const getLatestFileStatus = (): string | null => {
    const currentFiles = filesRef.current;
    if (currentFiles.length === 0) return null;

    // 최신 파일 찾기 (createdAt 기준)
    const latestFile = currentFiles.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest;
    });
    return latestFile.state;
  };

  useEffect(() => {
    // 세션 스토리지에서 업로드 진행 플래그 확인
    const isUploadInProgress = sessionStorage.getItem(storageKey);

    // 업로드 중이 아니면 체크하지 않음
    if (!isUploadInProgress) {
      return;
    }

    // 상태와 플래그 제거
    const clearStatusAndFlag = () => {
      setCurrentStatus(null);
      sessionStorage.removeItem(storageKey);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }
    };

    // 상태 체크 함수
    const checkStatus = async () => {
      try {
        await fetchFilesRef.current();
        const status = getLatestFileStatus();

        if (status) {
          setCurrentStatus(status);

          // 진행 중인 상태가 아니면 체크 중단하고 일정 시간 후 상태 제거
          if (!isProgressState(status)) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            // 완료/실패 상태를 보여준 후 자동으로 제거
            clearTimeoutRef.current = setTimeout(() => {
              clearStatusAndFlag();
            }, AUTO_CLEAR_DELAY);

            return;
          }
        }
      } catch (error) {
        console.error("[FileStatusChecker] Status check failed:", error);
      }
    };

    // 즉시 한 번 체크
    checkStatus();

    // 3초마다 체크
    const interval = setInterval(checkStatus, 3000);
    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }
    };
  }, [isProgressState, storageKey]);

  return currentStatus;
}
