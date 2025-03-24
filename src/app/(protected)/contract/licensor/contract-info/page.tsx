"use client";

import LicensorContractSearchTypeDropdown, {
  LicensorContractSearchType,
} from "./components/fragment/LicensorContractSearchTypeDropdown";
import { useEffect, useState } from "react";

import AddNewLicensorContract from "./components/AddNewLicensorContract";
import Gap from "@/components/basic/Gap";
import LicensorContractList from "./components/LicensorContractList";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import UserContract from "@/types/user-contract";
import styled from "styled-components";
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
  const { userContracts, searchUserContracts } = useUserContractStore();
  const [selectedType, setSelectedType] =
    useState<LicensorContractSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredContracts, setFilteredContracts] =
    useState<UserContract[]>(userContracts);

  useEffect(() => {
    setFilteredContracts(userContracts);
  }, [userContracts]);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setFilteredContracts(userContracts);
      return;
    }

    const _selectedType = selectedType === "all" ? "" : selectedType;
    const results = await searchUserContracts(searchValue, _selectedType);
    setFilteredContracts(results);
  };

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClickSearch={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </SearchInputWrapper>
        <AddNewLicensorContract />
      </SearchContainer>
      <Gap height={32} />
      <LicensorContractList userContracts={filteredContracts} />
    </Container>
  );
}
