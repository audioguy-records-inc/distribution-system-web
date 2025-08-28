"use client";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDetailDownloadButton from "./components/SettlementDetailDownloadButton";
import SettlementDetailList from "./components/SettlementDetailList";
import SettlementDetailSearch from "./components/SettlementDetailSearch";
import styled from "styled-components";
import theme from "@/styles/theme";

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

const TableLabel = styled.div`
  ${theme.fonts.title2.medium}
  color: ${theme.colors.gray[800]};
`;

export default function AdminSettlementDetailPage() {
  return (
    <Container>
      <PageHeader title="정산 상세 내역 조회" />
      <SettlementDetailSearch />
      <ButtonRow>
        <SettlementDetailDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <TableLabel>정산 상세 내역</TableLabel>
      <SettlementDetailList />
      <Gap height={32} />
    </Container>
  );
}
