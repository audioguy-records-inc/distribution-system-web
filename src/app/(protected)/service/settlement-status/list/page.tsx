"use client";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDownloadButton from "./components/fragment/SettlementDownloadButton";
import SettlementList from "./components/SettlementList";
import SettlementSearch from "./components/SettlementSearch";
import SettlementUploadButton from "./components/fragment/SettlementUploadButton";
import styled from "styled-components";

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
  return (
    <Container>
      <PageHeader title="정산금 조회" />
      <SettlementSearch />
      <ButtonRow>
        <SettlementUploadButton />
        <SettlementDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <SettlementList />
    </Container>
  );
}
