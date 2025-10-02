import { DataCollectionName, FileType } from "@/types/upload";
import { Dispatch, SetStateAction, useRef, useState } from "react";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomChip from "@/components/basic/CustomChip";
import { FileInfo } from "@/types/file-info";
import Gap from "@/components/basic/Gap";
import Track from "@/types/track";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import XIcon from "@/components/icons/XIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useUploadStore } from "@/stores/use-upload-store";

const Container = styled.div``;

const Header = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AudioFileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AudioContainer = styled.div`
  border: 1px solid ${theme.colors.gray[50]};
  padding: 8px 12px 8px 16px;
  border-radius: 100px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    .audio-actions {
      opacity: 1;
    }
  }
`;

const AudioName = styled.span`
  ${theme.fonts.body2.regular}
  color: ${theme.colors.gray[600]};
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AudioActions = styled.div.attrs({ className: "audio-actions" })`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Duration = styled.span`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[500]};
  margin-left: 8px;
`;

const UploadContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover .cancel-button {
    opacity: 1;
  }
`;

const CancelButton = styled.button.attrs({ className: "cancel-button" })`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${theme.colors.red[500]};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: ${theme.colors.red[600]};
  }
`;

export default function UploadTrackAudio({
  track,
  tracks,
  setTracks,
  index,
  showLabel = false,
}: {
  track: Track;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  index: number;
  showLabel?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadToS3, uploadProgress, cancelUpload } = useUploadStore();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancelUpload = () => {
    cancelUpload();
    setIsLoading(false);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 오디오 파일 타입 체크
      if (!file.type.startsWith("audio/")) {
        toast.error("오디오 파일만 업로드 가능합니다.");
        return;
      }

      // 오디오 파일 재생 시간 계산
      const audioDuration = await getAudioDuration(file);
      const formattedDuration = formatDuration(audioDuration);

      await handleUpload(file, formattedDuration);

      // 파일 선택 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpload = async (file: File, audioDuration: string) => {
    try {
      setIsLoading(true);
      const success = await uploadToS3({
        file: file,
        fileType: FileType.SONGS,
        dataCollectionName: DataCollectionName.SONGS,
      });

      if (success) {
        toast.success(`${file.name} 업로드가 완료되었습니다.`);

        // Track의 trackFileList 업데이트 (함수형 업데이트로 변경)
        setTracks((prevTracks: Track[]) =>
          prevTracks.map((t: Track, i: number) =>
            i === index
              ? {
                  ...t,
                  trackFileList: [
                    ...(t.trackFileList || []),
                    {
                      name: success.name,
                      filePath: success.filePath,
                      duration: audioDuration,
                    },
                  ],
                }
              : t,
          ),
        );

        return true;
      }
      return false;
    } catch (err) {
      toast.error(`${file.name} 업로드 중 오류가 발생했습니다.`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 오디오 파일 재생 시간 계산 함수
  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        URL.revokeObjectURL(audio.src);
        resolve(audio.duration);
      });

      // 오류 발생 시 기본값 반환
      audio.addEventListener("error", () => {
        URL.revokeObjectURL(audio.src);
        resolve(0);
      });
    });
  };

  // 재생 시간 포맷팅 함수 (초 -> mm:ss)
  const formatDuration = (seconds: number): string => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRemoveFile = (fileIndex: number) => {
    setTracks((prevTracks: Track[]) =>
      prevTracks.map((t: Track, i: number) =>
        i === index
          ? {
              ...t,
              trackFileList:
                t.trackFileList?.filter(
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  (_: any, fi: number) => fi !== fileIndex,
                ) || [],
            }
          : t,
      ),
    );
  };

  return (
    <Container>
      {showLabel && (
        <>
          <Header>
            음원파일 <span style={{ color: "red" }}>*</span>
          </Header>
          <Gap height={16} />
        </>
      )}
      {track.trackFileList && track.trackFileList.length > 0 ? (
        <div>
          {track.trackFileList.map((file, fileIndex) => (
            <AudioFileWrapper key={fileIndex}>
              <AudioContainer>
                <AudioName>{file.name}</AudioName>
                <AudioActions>
                  <IconButton onClick={() => handleRemoveFile(fileIndex)}>
                    <TrashIcon color={theme.colors.gray[300]} />
                  </IconButton>
                </AudioActions>
              </AudioContainer>
              <Duration>{file.duration || "00:00"}</Duration>
            </AudioFileWrapper>
          ))}
        </div>
      ) : (
        <UploadContainer>
          <ButtonOutlinedPrimary
            label={
              isLoading
                ? `업로드 중 ${Math.round(uploadProgress)}%`
                : "파일 업로드"
            }
            size="small"
            leftIcon={<UploadIcon />}
            onClick={handleButtonClick}
            disabled={isLoading}
          />
          {isLoading && (
            <CancelButton onClick={handleCancelUpload} title="업로드 취소">
              ×
            </CancelButton>
          )}
        </UploadContainer>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="audio/*"
      />
    </Container>
  );
}
