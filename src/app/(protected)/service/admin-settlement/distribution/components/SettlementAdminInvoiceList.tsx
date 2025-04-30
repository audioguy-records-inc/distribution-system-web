import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementAdminInvoice } from "@/types/settlement-matched-record";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

export default function SettlementAdminInvoiceList() {
  const { settlementAdminInvoices } = useSettlementStore();

  const columns: Column<SettlementAdminInvoice>[] = [
    {
      header: "정산월",
      accessor: "settlementMonth",
      type: "string",
      align: "center",
    },
    {
      header: "판매금액",
      accessor: "totalSettlementFee",
      type: "string",
      align: "center",
    },
    {
      header: "유통 수수료 수익",
      accessor: "totalDistributionFee",
      type: "string",
      align: "center",
    },
    {
      header: "권리자 정산 금액",
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
