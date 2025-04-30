import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementDetail } from "@/types/settlement-matched-record";
import moment from "moment";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

export default function SettlementList() {
  const { settlementDetails } = useSettlementStore();

  const columns: Column<SettlementDetail>[] = [
    {
      header: "음반코드",
      accessor: "albumDistributionCode",
      type: "string",
      align: "center",
    },
    {
      header: "음반명",
      accessor: "albumTitle",
      type: "string",
      align: "center",
    },
    {
      header: "아티스트",
      accessor: "artistNameList",
      type: "string",
      align: "center",
      render: (value) => {
        const _value = value as string[];
        return _value.join(", ");
      },
    },
    {
      header: "발매일",
      accessor: "utcReleasedAt",
      type: "string",
      align: "center",
      render: (value) => {
        const _value = value as string;
        return moment(_value).format("YYYY.MM.DD");
      },
    },
    {
      header: "권리자",
      accessor: "userDisplayName",
      type: "string",
      align: "center",
    },
    {
      header: "기획사",
      accessor: "agencyCompanyName",
      type: "string",
      align: "center",
    },
    {
      header: "정산금 합계",
      accessor: "userSettlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const _value = value as number;
        return _value;
      },
    },
  ];

  return (
    <Container>
      <CustomTable columns={columns} data={settlementDetails} />
    </Container>
  );
}
