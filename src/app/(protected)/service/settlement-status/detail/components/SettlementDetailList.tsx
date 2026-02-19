import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementDetail } from "@/types/settlement-matched-record";
import { formatCurrency } from "@/utils/format-currency";
import moment from "moment";
import styled from "styled-components";
import { useCurrencyStore } from "@/stores/use-currency-store";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";

const Container = styled.div``;

export default function SettlementDetailList() {
  const t = useTranslations("settlement");
  const { settlementDetails } = useSettlementStore();
  const { currency, exchangeRates } = useCurrencyStore();

  const columns: Column<SettlementDetail>[] = [
    {
      header: t("settlementMonth"),
      accessor: "settlementMonth",
      type: "string",
      align: "center",
      render: (value) => {
        const month = value as number;
        const year = Math.floor(month / 100);
        const monthNum = month % 100;
        return `${year}.${monthNum.toString().padStart(2, "0")}`;
      },
    },
    {
      header: t("salesMonth"),
      accessor: "salesMonth",
      type: "string",
      align: "center",
      render: (value) => {
        const month = value as number;
        const year = Math.floor(month / 100);
        const monthNum = month % 100;
        return `${year}.${monthNum.toString().padStart(2, "0")}`;
      },
    },
    {
      header: t("serviceChannel"),
      accessor: "service",
      type: "string",
      align: "center",
    },
    {
      header: t("albumName"),
      accessor: "albumTitle",
      type: "string",
      align: "center",
    },
    {
      header: t("trackName"),
      accessor: "trackTitle",
      type: "string",
      align: "center",
    },
    {
      header: t("artist"),
      accessor: "artistNameList",
      type: "string",
      align: "center",
      render: (value) => {
        const artists = value as string[];
        return artists.join(", ");
      },
    },
    {
      header: t("releaseDate"),
      accessor: "utcReleasedAt",
      type: "string",
      align: "center",
      render: (value) => {
        const date = value as string;
        return moment(date).format("YYYY.MM.DD");
      },
    },
    {
      header: t("label"),
      accessor: "agencyCompanyName",
      type: "string",
      align: "center",
    },
    {
      header: t("licensorName"),
      accessor: "userDisplayName",
      type: "string",
      align: "center",
    },
    {
      header: t("settlementAmount"),
      accessor: "userSettlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const amount = value as number;
        return formatCurrency(amount, currency, exchangeRates);
      },
    },
  ];

  return (
    <Container>
      <CustomTable columns={columns} data={settlementDetails} />
    </Container>
  );
}
