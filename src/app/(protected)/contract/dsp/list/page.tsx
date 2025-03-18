"use client";

import AddNewDspContract from "./components/AddNewDspContract";
import DSPFilterChip from "@/components/DspFilterChip";
import DspContractList from "./components/DspContractList";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function DspListPage() {
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
    </Container>
  );
}
