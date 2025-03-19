"use client";

import LicensorSearchType, {
  SearchType,
} from "./components/LicensorSearchType";

import AddNewLicensor from "./components/AddNewLicensor";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import { UserType } from "@/types/user";
import styled from "styled-components";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default function LicensorListPage() {
  const { users } = useUserStore();
  const [selectedType, setSelectedType] = useState<SearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <PageHeader title={"권리사 리스트"} />
      <SearchContainer>
        <SearchInputWrapper>
          <LicensorSearchType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <SearchInput placeholder="권리사명 검색" />
        </SearchInputWrapper>
        <AddNewLicensor />
      </SearchContainer>
    </Container>
  );
}
