"use client";

import DSPFilterChip, { DspType } from "@/components/DspFilterChip";
import { useMemo, useState } from "react";

import AddNewDspContract from "./components/AddNewDspContract";
import CenterSpinner from "@/components/CenterSpinner";
import DspContract from "@/types/dsp-contract";
import DspContractList from "./components/DspContractList";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListContainer = styled.div``;

export default function DspListPage() {
  const { dspContracts, isLoading, error } = useDspContractStore();
  const [selectedDsps, setSelectedDsps] = useState<DspType[]>(["ALL"]);

  const filteredContracts = useMemo(() => {
    if (selectedDsps.includes("ALL")) {
      return dspContracts;
    }

    return dspContracts.filter((contract) =>
      selectedDsps.includes(contract.dspInfo?.name as DspType),
    );
  }, [dspContracts, selectedDsps]);

  const handleFilterChange = (dsps: DspType[]) => {
    setSelectedDsps(dsps);
  };

  return (
    <Container>
      <PageHeader title={"DSP 리스트"} />
      <SearchContainer>
        <SearchInput
          placeholder="DPID 또는 계약명 검색"
          onClickSearch={() => {}}
          onChange={() => {}}
          value={""}
          isLoading={isLoading}
        />
        <AddNewDspContract />
      </SearchContainer>
      <Gap height={32} />
      <DSPFilterChip onFilterChange={handleFilterChange} />
      <Gap height={32} />
      <ListContainer>
        <DspContractList dspContracts={filteredContracts} />
        {isLoading && <CenterSpinner />}
      </ListContainer>
    </Container>
  );
}
