import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import Dsp from "@/components/basic/custom-table/components/Dsp";
import DspContract from "@/types/dsp-contract";
import { getFullUrl } from "@/constants/api";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useEffect } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

const StatusBadge = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.purple[50] : theme.colors.gray[50]};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.green[600] : theme.colors.gray[600]};
  ${theme.fonts.body2.medium}
`;

const DspContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

const DspImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 50%;
`;

const DspInfo = styled.div`
  display: flex;
  flex-direction: column;
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
`;

export default function DspContractList() {
  const { user } = useUserStore();
  const { dspContracts, isLoading, error, fetchDspContracts } =
    useDspContractStore();

  useEffect(() => {
    if (user) {
      fetchDspContracts();
    }
  }, [user, fetchDspContracts]);

  const columns: Column<DspContract>[] = [
    {
      header: "DPID",
      accessor: "dspContractUniqueId",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      header: "DSP",
      accessor: "dspId",
      type: "string",
      width: 190,
      align: "center",
      render: (value, record) => {
        const dsp = record.dspInfo;

        if (!dsp) {
          return "";
        }

        return <Dsp name={dsp.name} imagePath={dsp.imageOriginalPath} />;
      },
    },
    {
      header: "계약명",
      accessor: "dspContractName",
      type: "string",
      width: 417,
      align: "center",
    },
    {
      header: "활성 여부",
      accessor: "isContractEnabled",
      type: "component",
      width: 170,
      align: "center",

      render: (value) => <ActivateStateBadge isActive={Boolean(value)} />,
    },
  ];

  const renderExpandedContent = (record: DspContract) => {
    return (
      <div>
        <p>계약 상세 정보:</p>
        <p>지역 유형: {record.regionType === "domestic" ? "국내" : "해외"}</p>
        <p>국가 코드: {record.countryCode}</p>
        <p>계약 요율: {record.contractRate}%</p>
        <p>시간 출시 활성화: {record.isTimeReleaseEnabled ? "예" : "아니오"}</p>
      </div>
    );
  };

  if (isLoading) {
    return <Container>로딩 중...</Container>;
  }

  if (error) {
    return <Container>오류가 발생했습니다: {error}</Container>;
  }

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={dspContracts || []}
        expandable={{
          expandedRowRender: renderExpandedContent,
          expandColumnWidth: 50,
        }}
      />
    </Container>
  );
}
