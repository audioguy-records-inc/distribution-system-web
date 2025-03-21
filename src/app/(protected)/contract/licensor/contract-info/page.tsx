"use client";

import LicensorContractSearchTypeDropdown, {
  LicensorContractSearchType,
} from "./components/LicensorContractSearchTypeDropdown";

import AddNewLicensorContract from "./components/AddNewLicensorContract";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useState } from "react";
import { useUserContractStore } from "@/stores/use-user-contract-store";

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

export default function LicensorContractInfoPage() {
  const { userContracts } = useUserContractStore();
  const [selectedType, setSelectedType] =
    useState<LicensorContractSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <PageHeader title={"권리사 계약 리스트"} />
      <SearchContainer>
        <SearchInputWrapper>
          <LicensorContractSearchTypeDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <SearchInput
            placeholder="계약명, 권리사명, 계약코드 입력"
            onClickSearch={() => {}}
            onChange={() => {}}
            value={searchValue}
          />
        </SearchInputWrapper>
        <AddNewLicensorContract />
      </SearchContainer>
    </Container>
  );
}
