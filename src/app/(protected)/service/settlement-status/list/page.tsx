"use client";

import { useCallback, useState } from "react";

import { AuthLevel } from "@/types/user";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDownloadButton from "./components/fragment/SettlementDownloadButton";
import SettlementFileListButton from "./components/fragment/SettlementFileListButton";
import SettlementFileListModal from "./components/SettlementFileListModal";
import SettlementFileStatusChecker from "./components/SettlementFileStatusChecker";
import SettlementList from "./components/SettlementList";
import SettlementSearch from "./components/SettlementSearch";
import SettlementUploadButton from "./components/fragment/SettlementUploadButton";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export default function AdminSettlementListPage() {
  const [statusCheckerKey, setStatusCheckerKey] = useState(0);
  const [isFileListModalOpen, setIsFileListModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleUploadComplete = useCallback(() => {
    // 컴포넌트를 새로 마운트하기 위해 key 변경
    setStatusCheckerKey((prev) => prev + 1);
  }, []);

  const handleFileListButtonClick = useCallback(() => {
    setIsFileListModalOpen(true);
  }, []);

  const handleFileListModalClose = useCallback(() => {
    setIsFileListModalOpen(false);
  }, []);

  // 관리자(ADMIN)가 아닌 경우 업로드 관련 버튼들을 숨김
  const isAdmin = user?.authLevel === AuthLevel.ADMIN;

  return (
    <Container>
      <PageHeader title="정산금 조회" />
      <SettlementSearch />
      <ButtonRow>
        {isAdmin && (
          <SettlementFileStatusChecker
            key={`settlement-status-checker-${statusCheckerKey}`}
          />
        )}
        {isAdmin && (
          <>
            <SettlementUploadButton onUploadComplete={handleUploadComplete} />
            <SettlementFileListButton onClick={handleFileListButtonClick} />
          </>
        )}
        <SettlementDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <SettlementList />
      {isAdmin && (
        <SettlementFileListModal
          isOpen={isFileListModalOpen}
          onClose={handleFileListModalClose}
        />
      )}
    </Container>
  );
}
