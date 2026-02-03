"use client";

import LicensorSearchTypeDropdown, {
  LicensorSearchType,
} from "./components/LicensorSearchTypeDropdown";
import { User, UserType } from "@/types/user";
import { useEffect, useState } from "react";

import AddNewLicensor from "./components/AddNewLicensor";
import Gap from "@/components/basic/Gap";
import LicensorList from "./components/LicensorList";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useTranslations } from "next-intl";
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
  const tLicensor = useTranslations("licensor");
  const { users, searchUsers } = useUserStore();
  const [selectedType, setSelectedType] = useState<LicensorSearchType>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setFilteredUsers(users);
      return;
    }
    const _selectedType = selectedType === "all" ? "" : selectedType;
    const response = await searchUsers(searchValue, _selectedType);
    setFilteredUsers(response);
  };

  return (
    <Container>
      <PageHeader title={tLicensor("licensorList")} />
      <SearchContainer>
        <SearchInputWrapper>
          <LicensorSearchTypeDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <SearchInput
            placeholder={tLicensor("licensorSearchPlaceholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClickSearch={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </SearchInputWrapper>
        <AddNewLicensor />
      </SearchContainer>
      <Gap height={32} />
      <LicensorList licensors={filteredUsers} />
    </Container>
  );
}
