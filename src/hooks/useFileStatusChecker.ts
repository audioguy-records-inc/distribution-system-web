import { useEffect, useRef, useState } from "react";

interface FileWithStatus {
  createdAt: string | Date;
  state: string;
}

interface UseFileStatusCheckerParams<T extends FileWithStatus> {
  files: T[];
  fetchFiles: () => Promise<void>;
  isProgressState: (status: string) => boolean;
}

export function useFileStatusChecker<T extends FileWithStatus>({
  files,
  fetchFiles,
  isProgressState,
}: UseFileStatusCheckerParams<T>) {
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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
    // 상태 체크 함수
    const checkStatus = async () => {
      try {
        await fetchFilesRef.current();
        const status = getLatestFileStatus();

        if (status) {
          setCurrentStatus(status);

          // 진행 중인 상태가 아니면 체크 중단
          if (!isProgressState(status)) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
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
    };
  }, [isProgressState]);

  return currentStatus;
}