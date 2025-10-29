import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import { FileInfo } from "@/types/file-info";
import SettlementUpload from "@/components/basic/SettlementUpload";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

const SETTLEMENT_UPLOAD_STORAGE_KEY = "settlement_upload_in_progress";

interface SettlementUploadButtonProps {
  onUploadComplete?: () => void;
}

export default function SettlementUploadButton({
  onUploadComplete,
}: SettlementUploadButtonProps) {
  const [uploadFilePath, setUploadFilePath] = useState<FileInfo[]>([]);
  const { createSettlementFiles } = useSettlementStore();

  useEffect(() => {
    if (uploadFilePath.length > 0) {
      const handleCreateFiles = async () => {
        const fileInfos = uploadFilePath.map((file) => ({
          filename: file.name,
          filePath: file.filePath,
        }));

        try {
          // 업로드 시작 플래그 설정
          sessionStorage.setItem(SETTLEMENT_UPLOAD_STORAGE_KEY, "true");

          await createSettlementFiles({
            fileInfos: fileInfos,
          });

          // 파일 생성 완료 후 상태 체크 시작
          onUploadComplete?.();
        } catch (error) {
          console.error("Settlement files creation failed:", error);
          // 실패 시에도 플래그 유지 (에러 상태를 표시하기 위해)
        }
      };

      handleCreateFiles();
    }
  }, [uploadFilePath, createSettlementFiles, onUploadComplete]);
  return (
    <Container>
      <SettlementUpload
        onChange={setUploadFilePath}
        value={uploadFilePath}
        fileType={FileType.DOCS}
        dataCollectionName={DataCollectionName.SETTLEMENTS}
        headerText="정산금 업로드"
      />
    </Container>
  );
}
