"use client";

import AddNewDspContract from "./components/AddNewDspContract";
import CenterSpinner from "@/components/CenterSpinner";
import DSPFilterChip from "@/components/DspFilterChip";
import DspContractList from "./components/DspContractList";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function DspListPage() {
  const { dspContracts, isLoading, error } = useDspContractStore();
  return (
    <Container>
      <PageHeader title={"DSP 리스트"} />
      <SearchContainer>
        <SearchInput />
        <AddNewDspContract />
      </SearchContainer>
      <Gap height={36} />
      <DSPFilterChip />
      <Gap height={32} />
      <DspContractList />
      {isLoading && <CenterSpinner />}
    </Container>
  );
}
