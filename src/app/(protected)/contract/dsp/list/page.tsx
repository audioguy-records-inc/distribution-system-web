"use client";

import AddNew from "./components/AddNew";
import DSPFilterChip from "@/components/DSPFilterChip";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "./components/SearchInput";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function DspListPage() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <Container>
      <PageHeader title={"DSP 리스트"} />
      <SearchContainer>
        <SearchInput />
        <AddNew />
      </SearchContainer>
      <Gap height={36} />
      <DSPFilterChip />
      <Gap height={32} />
    </Container>
  );
}
