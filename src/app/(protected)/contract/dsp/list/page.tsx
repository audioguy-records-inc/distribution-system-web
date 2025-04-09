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
  const { dspContracts, isLoading, error } = useDspContractStore();
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

    // 필터 변경 시 현재 검색어를 유지하면서 필터링
    let contracts = dspContracts;
    if (!dsps.includes("ALL")) {
      contracts = contracts.filter((contract) =>
        dsps.includes(contract.dspInfo?.name as DspType),
      );
    }

    // 검색어가 있는 경우 검색 필터도 적용
    if (searchValue.trim()) {
      contracts = contracts.filter((contract) =>
        contract.dspContractName
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
    }

    setFilteredContracts(contracts);
  };

  const handleSearch = async () => {
    // 현재 선택된 DSP 필터를 유지하면서 검색
    let contracts = dspContracts;

    // DSP 필터 적용
    if (!selectedDsps.includes("ALL")) {
      contracts = contracts.filter((contract) =>
        selectedDsps.includes(contract.dspInfo?.name as DspType),
      );
    }

    // 검색어 필터 적용
    if (searchValue.trim()) {
      contracts = contracts.filter((contract) =>
        contract.dspContractName
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()),
      );
    } else {
      // 검색어가 없는 경우 DSP 필터만 적용된 결과 표시
    }

    setFilteredContracts(contracts);
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
        <DspContractList
          dspContracts={filteredContracts}
          isLoading={isLoading}
        />
      </ListContainer>
    </Container>
  );
}
