"use client";

import LicensorSearchTypeDropdown, {
  LicensorSearchType,
} from "./components/LicensorSearchTypeDropdown";

import AddNewLicensor from "./components/AddNewLicensor";
import LicensorList from "./components/LicensorList";
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
  const [selectedType, setSelectedType] = useState<LicensorSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <PageHeader title={"권리사 리스트"} />
      <SearchContainer>
        <SearchInputWrapper>
          <LicensorSearchTypeDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <SearchInput
            placeholder="권리사 ID 또는 권리사명 입력"
            onClickSearch={() => {
              console.log("search");
            }}
            onChange={() => {}}
            value={searchValue}
          />
        </SearchInputWrapper>
        <AddNewLicensor />
      </SearchContainer>
      <LicensorList licensors={users} />
    </Container>
  );
}
