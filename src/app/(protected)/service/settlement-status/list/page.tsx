"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDownloadButton from "./components/fragment/SettlementDownloadButton";
import SettlementFileStatusChecker from "./components/SettlementFileStatusChecker";
import SettlementList from "./components/SettlementList";
import SettlementSearch from "./components/SettlementSearch";
import SettlementUploadButton from "./components/fragment/SettlementUploadButton";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

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

  const handleUploadComplete = useCallback(() => {
    // 컴포넌트를 새로 마운트하기 위해 key 변경
    setStatusCheckerKey((prev) => prev + 1);
  }, []);

  return (
    <Container>
      <PageHeader title="정산금 조회" />
      <SettlementSearch />
      <ButtonRow>
        <SettlementFileStatusChecker
          key={`settlement-status-checker-${statusCheckerKey}`}
        />
        <SettlementUploadButton onUploadComplete={handleUploadComplete} />
        <SettlementDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <SettlementList />
    </Container>
  );
}
