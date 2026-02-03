"use client";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDetailDownloadButton from "./components/SettlementDetailDownloadButton";
import SettlementDetailList from "./components/SettlementDetailList";
import SettlementDetailSearch from "./components/SettlementDetailSearch";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

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
  const tSettlement = useTranslations("settlement");

  return (
    <Container>
      <PageHeader title={tSettlement("settlementDetail")} />
      <SettlementDetailSearch />
      <ButtonRow>
        <SettlementDetailDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <TableLabel>{tSettlement("settlementDetail")}</TableLabel>
      <SettlementDetailList />
      <Gap height={32} />
    </Container>
  );
}
