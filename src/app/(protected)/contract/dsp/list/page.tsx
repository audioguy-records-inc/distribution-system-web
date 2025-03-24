"use client";

import DSPFilterChip, { DspType } from "@/components/DspFilterChip";
import { useEffect, useMemo, useState } from "react";

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
  const { dspContracts, isLoading, error, searchDspContracts } =
    useDspContractStore();
  const [selectedDsps, setSelectedDsps] = useState<DspType[]>(["ALL"]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredContracts, setFilteredContracts] = useState<DspContract[]>([]);

  useEffect(() => {
    let contracts = dspContracts;
    if (!selectedDsps.includes("ALL")) {
      contracts = contracts.filter((contract) =>
        selectedDsps.includes(contract.dspInfo?.name as DspType),
      );
    }
    setFilteredContracts(contracts);
  }, [dspContracts, selectedDsps]);

  const handleFilterChange = (dsps: DspType[]) => {
    setSelectedDsps(dsps);
    // 필터 변경 시 검색 상태 초기화
    let contracts = dspContracts;
    if (!selectedDsps.includes("ALL")) {
      contracts = contracts.filter((contract) =>
        selectedDsps.includes(contract.dspInfo?.name as DspType),
      );
    }

    setFilteredContracts(contracts);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setFilteredContracts(dspContracts);
      return;
    }

    const results = await searchDspContracts(searchValue, "dspContractName");
    setFilteredContracts(results);
    setSelectedDsps(["ALL"]);
  };

  return (
    <Container>
      <PageHeader title={"DSP 리스트"} />
      <SearchContainer>
        <SearchInput
          placeholder="DPID 또는 계약명 검색"
          onClickSearch={handleSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          value={searchValue}
          isLoading={isLoading}
        />
        <AddNewDspContract />
      </SearchContainer>
      <Gap height={32} />
      <DSPFilterChip
        onFilterChange={handleFilterChange}
        selectedDsps={selectedDsps}
      />
      <Gap height={32} />
      <ListContainer>
        <DspContractList dspContracts={filteredContracts} />
        {isLoading && <CenterSpinner />}
      </ListContainer>
    </Container>
  );
}
