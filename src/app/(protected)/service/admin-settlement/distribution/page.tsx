"use client";

import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementAdminInvoiceDownloadButton from "./components/fragment/SettlementAdminInvoiceDownloadButton";
import SettlementAdminInvoiceSearch from "./components/SettlementAdminInvoiceSearch";
import styled from "styled-components";
import theme from "@/styles/theme";

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
  return (
    <Container>
      <PageHeader title="유통정산 현황" />
      <SettlementAdminInvoiceSearch />
      <Gap height={32} />
      <ButtonRow>
        <HelpText>
          {`정산금 상세 조회는 정산현황 > 정산금 조회 메뉴를 이용해주세요.`}
        </HelpText>
        <SettlementAdminInvoiceDownloadButton />
      </ButtonRow>
    </Container>
  );
}
