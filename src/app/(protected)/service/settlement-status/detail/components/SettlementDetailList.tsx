import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { SettlementDetail } from "@/types/settlement-matched-record";
import moment from "moment";
import styled from "styled-components";
import { useSettlementStore } from "@/stores/use-settlement-store";

const Container = styled.div``;

export default function SettlementDetailList() {
  const { settlementDetails } = useSettlementStore();

  const columns: Column<SettlementDetail>[] = [
    {
      header: "정산월",
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
      header: "판매월",
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
      header: "서비스채널",
      accessor: "service",
      type: "string",
      align: "center",
    },
    {
      header: "앨범명",
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
        const artists = value as string[];
        return artists.join(", ");
      },
    },
    {
      header: "발매일",
      accessor: "utcReleasedAt",
      type: "string",
      align: "center",
      render: (value) => {
        const date = value as string;
        return moment(date).format("YYYY.MM.DD");
      },
    },
    {
      header: "기획사",
      accessor: "agencyCompanyName",
      type: "string",
      align: "center",
    },
    {
      header: "권리사명",
      accessor: "userDisplayName",
      type: "string",
      align: "center",
    },
    {
      header: "정산금",
      accessor: "userSettlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const amount = value as number;
        return amount.toLocaleString();
      },
    },
  ];

  return (
    <Container>
      <CustomTable columns={columns} data={settlementDetails} />
    </Container>
  );
}
