import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useRef, useState } from "react";

import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import { FileInfo } from "@/types/file-info";
import UploadIcon from "@/components/icons/UploadIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useAlbumStore } from "@/stores/use-album-store";
import { useUploadStore } from "@/stores/use-upload-store";

const Container = styled.div``;

export default function AlbumUploadButton() {
  const [uploadFilePath, setUploadFilePath] = useState<FileInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadToS3 } = useUploadStore();
  const { uploadAlbumFile } = useAlbumStore();

  // 파일 확장자 검증 함수
  const validateFileType = (file: File): boolean => {
    const allowedExtensions = [".xlsx", ".csv"];
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf("."));

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("xlsx 또는 csv 파일만 업로드 가능합니다.");
      return false;
    }
    return true;
  };

  // 파일 업로드 핸들러
  const handleUpload = async (file: File) => {
    // 파일 타입 검증
    if (!validateFileType(file)) return false;

    try {
      setIsLoading(true);

      // 1. S3에 파일 업로드
      const success = await uploadToS3({
        file: file,
        fileType: FileType.DOCS,
        dataCollectionName: DataCollectionName.ALBUMS,
      });

      if (success) {
        // 2. 앨범 스토어에 파일 정보 저장
        await uploadAlbumFile(success.name, success.filePath);

        // FileInfo 형식으로 변환하여 상태 업데이트
        const fileInfo: FileInfo = {
          name: success.name,
          filePath: success.filePath,
        };
        setUploadFilePath((prev) => [...prev, fileInfo]);

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

  // 파일 선택 핸들러
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 선택된 각 파일을 즉시 업로드
      for (let i = 0; i < files.length; i++) {
        await handleUpload(files[i]);
      }
      // 파일 선택 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (uploadFilePath.length > 0) {
      console.log("업로드된 파일:", uploadFilePath);
    }
  }, [uploadFilePath]);

  return (
    <Container>
      <ButtonOutlinedPrimary
        label={isLoading ? "업로드 중..." : "앨범 엑셀 업로드"}
        leftIcon={<UploadIcon />}
        size="medium"
        onClick={handleButtonClick}
        disabled={isLoading}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
        accept=".xlsx,.csv"
      />
    </Container>
  );
}
