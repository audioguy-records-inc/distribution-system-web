import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import Dsp from "@/components/basic/custom-table/components/Dsp";
import DspContract from "@/types/dsp-contract";
import DspContractDetail from "./DspContractDetail";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useEffect } from "react";

const Container = styled.div``;

export default function DspContractList({
  dspContracts,
}: {
  dspContracts: DspContract[];
}) {
  const { user } = useAuthStore();
  const { fetchDspContracts } = useDspContractStore();

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

  const renderExpandedContent = (dspContract: DspContract) => {
    return <DspContractDetail dspContract={dspContract} />;
  };

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
