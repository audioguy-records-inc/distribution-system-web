"use client";

import PageHeader from "@/components/PageHeader";
import SettlementTaxInvoiceSearch from "./components/SettlementTaxInvoiceSearch";
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

export default function AdminSettlementDetailPage() {
  return (
    <Container>
      <PageHeader title="상세내역 조회" />
      <SettlementTaxInvoiceSearch />
    </Container>
  );
}
