import { DataCollectionName, FileType } from "@/types/upload";
import { useEffect, useState } from "react";

import { FileInfo } from "@/types/file-info";
import SettlementUpload from "@/components/basic/SettlementUpload";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

export default function SettlementUploadButton() {
  const [uploadFilePath, setUploadFilePath] = useState<FileInfo[]>([]);
  const { createSettlementFiles } = useSettlementStore();

  useEffect(() => {
    if (uploadFilePath.length > 0) {
      const fileInfos = uploadFilePath.map((file) => ({
        filename: file.name,
        filePath: file.filePath,
      }));
      createSettlementFiles({
        fileInfos: fileInfos,
      });
    }
  }, [uploadFilePath]);
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
