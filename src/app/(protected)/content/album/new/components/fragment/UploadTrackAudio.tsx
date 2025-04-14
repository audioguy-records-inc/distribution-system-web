import { DataCollectionName, FileType } from "@/types/upload";
import { useRef, useState } from "react";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomChip from "@/components/basic/CustomChip";
import { EditTrack } from "../TrackSection";
import { FileInfo } from "@/types/file-info";
import TrashIcon from "@/components/icons/TrashIcon";
import UploadIcon from "@/components/icons/UploadIcon";
import XIcon from "@/components/icons/XIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useTrackStore } from "@/stores/use-track-store";
import { useUploadStore } from "@/stores/use-upload-store";

const Container = styled.div``;

const AudioFileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AudioFile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 8px 16px;
  border-radius: 100px;
  border: 1px solid ${theme.colors.gray[50]};
  position: relative;
`;

const AudioFileName = styled.span`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[800]};
  max-width: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Duration = styled.span`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[500]};
  margin-left: 8px;
`;

const DeleteButton = styled.div`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  ${AudioFile}:hover & {
    opacity: 1;
  }
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

export default function UploadTrackAudio({ track }: { track: EditTrack }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioFile, setAudioFile] = useState<FileInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<string>("");
  const { uploadToS3 } = useUploadStore();
  const { updateTrack } = useTrackStore();
  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
      setDuration(formatDuration(audioDuration));

      await handleUpload(file);

      // 파일 선택 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const success = await uploadToS3({
        file: file,
        fileType: FileType.SONGS,
        dataCollectionName: DataCollectionName.SONGS,
      });

      if (success) {
        toast.success(`${file.name} 업로드가 완료되었습니다.`);
        // FileInfo 형식으로 변환
        const fileInfo: FileInfo = {
          name: success.name,
          filePath: success.filePath,
        };
        setAudioFile(fileInfo);

        // track의 trackFileList에 파일 정보 추가
        if (!track.trackFileList) {
          track.trackFileList = [];
        }
        track.trackFileList.push({
          name: success.name,
          filePath: success.filePath,
        });
        // await updateTrack(track);

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

  const handleRemoveFile = async () => {
    // Implement the remove file logic here
    if (track.trackFileList && track.trackFileList.length > 0) {
      track.trackFileList = [];
    }
    // await updateTrack(track);
  };

  return (
    <Container>
      {track.trackFileList && track.trackFileList.length > 0 ? (
        <AudioFileWrapper>
          <AudioContainer>
            <AudioName>{track.trackFileList[0].name}</AudioName>
            <AudioActions>
              <IconButton onClick={handleRemoveFile}>
                <TrashIcon color={theme.colors.gray[300]} />
              </IconButton>
            </AudioActions>
          </AudioContainer>
          <Duration>{duration}</Duration>
        </AudioFileWrapper>
      ) : (
        <ButtonOutlinedPrimary
          label={isLoading ? "업로드 중" : "업로드"}
          size="small"
          leftIcon={<UploadIcon />}
          onClick={handleButtonClick}
          disabled={isLoading}
        />
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
