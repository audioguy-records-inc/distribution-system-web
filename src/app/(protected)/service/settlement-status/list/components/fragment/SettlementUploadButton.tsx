import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import { FileInfo } from "@/types/file-info";
import SettlementUpload from "@/components/basic/SettlementUpload";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

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
          await createSettlementFiles({
            fileInfos: fileInfos,
          });
          
          // 파일 생성 완료 후 상태 체크 시작
          onUploadComplete?.();
        } catch (error) {
          console.error("Settlement files creation failed:", error);
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
