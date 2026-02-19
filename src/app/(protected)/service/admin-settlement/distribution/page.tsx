"use client";

import CurrencySelector from "@/components/CurrencySelector";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementAdminInvoiceDownloadButton from "./components/fragment/SettlementAdminInvoiceDownloadButton";
import SettlementAdminInvoiceList from "./components/SettlementAdminInvoiceList";
import SettlementAdminInvoiceSearch from "./components/SettlementAdminInvoiceSearch";
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
  justify-content: space-between;
  align-items: center;
`;

const HelpText = styled.div`
  ${theme.fonts.body2.medium};
  color: ${theme.colors.gray[500]};
`;

export default function SettlementStatusPage() {
  const tSettlement = useTranslations("settlement");

  return (
    <Container>
      <PageHeader title={tSettlement("distributionSettlement")} />
      <SettlementAdminInvoiceSearch />
      <Gap height={32} />
      <ButtonRow>
        <HelpText>
          {tSettlement("distributionHelpText")}
        </HelpText>
        <SettlementAdminInvoiceDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <CurrencySelector />
      <SettlementAdminInvoiceList />
    </Container>
  );
}
