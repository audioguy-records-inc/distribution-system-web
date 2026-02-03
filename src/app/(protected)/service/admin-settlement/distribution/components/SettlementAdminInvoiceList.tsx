import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementAdminInvoice } from "@/types/settlement-matched-record";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";

const Container = styled.div``;

export default function SettlementAdminInvoiceList() {
  const t = useTranslations("settlement");
  const { settlementAdminInvoices } = useSettlementStore();

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
    },
    {
      header: t("distributionFee"),
      accessor: "totalDistributionFee",
      type: "string",
      align: "center",
    },
    {
      header: t("licensorSettlement"),
      accessor: "totalUserSettlementFee",
      type: "string",
      align: "center",
    },
  ];

  return (
    <Container>
      <CustomTable columns={columns} data={settlementAdminInvoices} />
    </Container>
  );
}
