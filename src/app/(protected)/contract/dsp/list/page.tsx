"use client";

import AddNew from "../../../../../components/AddNew";
import AddNewDspContract from "./components/add-new-dsp-contract/AddNewDspContract";
import DSPFilterChip from "@/components/DspFilterChip";
import DspContractList from "./components/dsp-contract-list/DspContractList";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "../../../../../components/SearchInput";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useEffect } from "react";
import { useUserStore } from "@/stores/use-user-store";

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
