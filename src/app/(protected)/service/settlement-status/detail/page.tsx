"use client";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementTaxInvoiceDomesticList from "./components/SettlementTaxInvoiceDomesticList";
import SettlementTaxInvoiceDownloadButton from "./components/SettlementTaxInvoiceDownloadButton";
import SettlementTaxInvoiceInternationalList from "./components/SettlementTaxInvoiceIntermationalList";
import SettlementTaxInvoiceSearch from "./components/SettlementTaxInvoiceSearch";
import SettlementTaxInvoiceTotalList from "./components/SettlementTaxInvoiceTotalList";
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
      <PageHeader title="상세내역 조회" />
      <SettlementTaxInvoiceSearch />
      <ButtonRow>
        <SettlementTaxInvoiceDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <TableLabel>국내 세금계산서 발행금액 내역</TableLabel>
      <SettlementTaxInvoiceDomesticList />
      <Gap height={32} />
      <TableLabel>해외 세금계산서 발행금액 내역</TableLabel>
      <SettlementTaxInvoiceInternationalList />
      <Gap height={32} />
      <TableLabel>총 세금계산서 발행금액 내역</TableLabel>
      <SettlementTaxInvoiceTotalList />
      <Gap height={32} />
    </Container>
  );
}
