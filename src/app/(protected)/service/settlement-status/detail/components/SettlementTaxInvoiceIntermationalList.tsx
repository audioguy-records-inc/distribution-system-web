import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementTaxInvoice } from "@/types/settlement-matched-record";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

export default function SettlementTaxInvoiceInternationalList() {
  const { settlementTaxInvoices } = useSettlementStore();

  const columns: Column<SettlementTaxInvoice>[] = [
    {
      header: "정산월",
      accessor: "settlementMonth",
      type: "string",
      align: "center",
    },
    {
      header: "공급가액",
      accessor: "international",
      type: "string",
      align: "center",
      render: (value) => {
        const domestic = value as {
          netAmount: number;
          taxAmount: number;
          totalAmount: number;
        };
        return domestic.netAmount;
      },
    },
    {
      header: "세액",
      accessor: "international",
      type: "string",
      align: "center",
      render: (value) => {
        const domestic = value as {
          netAmount: number;
          taxAmount: number;
          totalAmount: number;
        };
        return domestic.taxAmount;
      },
    },
    {
      header: "총 발행금액",
      accessor: "international",
      type: "string",
      align: "center",
      render: (value) => {
        const domestic = value as {
          netAmount: number;
          taxAmount: number;
          totalAmount: number;
        };
        return domestic.totalAmount;
      },
    },
  ];

  return (
    <Container>
      <CustomTable columns={columns} data={settlementTaxInvoices} />
    </Container>
  );
}
