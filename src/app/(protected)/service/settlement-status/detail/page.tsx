"use client";

import CurrencySelector from "@/components/CurrencySelector";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SettlementDetailDownloadButton from "./components/SettlementDetailDownloadButton";
import SettlementDetailList from "./components/SettlementDetailList";
import SettlementDetailSearch from "./components/SettlementDetailSearch";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/use-auth-store";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { AuthLevel } from "@/types/user";

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

const StatusRow = styled.div<{ $color?: string }>`
  display: flex;
  align-items: center;
  padding: 12px 0;
  ${theme.fonts.body1.medium};
  color: ${({ $color }) => $color || theme.colors.gray[400]};
`;

const TableLabel = styled.div`
  ${theme.fonts.title2.medium}
  color: ${theme.colors.gray[800]};
`;

export default function AdminSettlementDetailPage() {
  const tSettlement = useTranslations("settlement");
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.authLevel === AuthLevel.ADMIN;
  const { loadingMoreStatus, settlementDetails } = useSettlementStore();

  return (
    <Container>
      <PageHeader title={tSettlement(isAdmin ? "settlementDetailAdmin" : "settlementDetailUser")} />
      <SettlementDetailSearch />
      {loadingMoreStatus === "loading" && (
        <StatusRow>
          {tSettlement("loadingAllDetails")} ({settlementDetails.length.toLocaleString()})
        </StatusRow>
      )}
      {loadingMoreStatus === "done" && (
        <StatusRow>
          {tSettlement("loadedAllDetails")} ({settlementDetails.length.toLocaleString()})
        </StatusRow>
      )}
      {loadingMoreStatus === "error" && (
        <StatusRow $color={theme.colors.gray[500]}>{tSettlement("loadAllDetailsFailed")}</StatusRow>
      )}
      <ButtonRow>
        <SettlementDetailDownloadButton />
      </ButtonRow>
      <Gap height={32} />
      <CurrencySelector />
      <TableLabel>{tSettlement(isAdmin ? "settlementDetailAdmin" : "settlementDetailUser")}</TableLabel>
      <SettlementDetailList />
      <Gap height={32} />
    </Container>
  );
}
