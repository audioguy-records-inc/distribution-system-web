import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementAdminInvoice } from "@/types/settlement-matched-record";
import { formatCurrency } from "@/utils/format-currency";
import styled from "styled-components";
import { useCurrencyStore } from "@/stores/use-currency-store";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";

const Container = styled.div``;

export default function SettlementAdminInvoiceList() {
  const t = useTranslations("settlement");
  const { settlementAdminInvoices } = useSettlementStore();
  const { currency, exchangeRates } = useCurrencyStore();

  const columns: Column<SettlementAdminInvoice>[] = [
    {
      header: t("settlementMonth"),
      accessor: "settlementMonth",
      type: "string",
      align: "center",
    },
    {
      header: t("salesAmount"),
      accessor: "totalSettlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const amount = value as number;
        return formatCurrency(amount, currency, exchangeRates);
      },
    },
    {
      header: t("distributionFee"),
      accessor: "totalDistributionFee",
      type: "string",
      align: "center",
      render: (value) => {
        const amount = value as number;
        return formatCurrency(amount, currency, exchangeRates);
      },
    },
    {
      header: t("licensorSettlement"),
      accessor: "totalUserSettlementFee",
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
      <CustomTable columns={columns} data={settlementAdminInvoices} />
    </Container>
  );
}
