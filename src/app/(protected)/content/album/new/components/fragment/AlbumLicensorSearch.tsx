import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";

import Album from "@/types/album";
import { Column } from "@/components/basic/custom-table/CustomTable";
import CustomChip from "@/components/basic/CustomChip";
import Gap from "@/components/basic/Gap";
import SearchDropdownInput from "@/components/SearchDropdownInput";
import TrashIcon from "@/components/icons/TrashIcon";
import { User } from "@/types/user";
import UserTypeBadge from "@/components/basic/custom-table/components/UserTypeBadge";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div`
  overflow-y: visible;
`;

const Title = styled.div`
  ${theme.fonts.heading2.medium}
  color: ${theme.colors.gray[800]};
`;

const SelectedUserContainer = styled.div`
  padding-top: 8px;
`;

export default function AlbumLicensorSearch({
  value,
  onChange,
  readOnly = false,
  user,
  register,
  setValue,
}: {
  value: string;
  onChange: (value: string | null) => void;
  readOnly?: boolean;
  user?: User;
  register: UseFormRegister<Album>;
  setValue: UseFormSetValue<Album>;
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(user || null);
  const { searchUsers } = useUserStore();
  const tl = useTranslations("licensor");

  useEffect(() => {
    if (user) {
      setSelectedUser(user);
    }
  }, [user]);

  const handleDelete = () => {
    setSelectedUser(null);
    onChange(null);
    setValue("userContractId", undefined);
    setValue("userContractInfo", undefined);
    setValue("dspContractIdList", []);
  };

  const onSelect = (selectedItem: User) => {
    setSelectedUser(selectedItem);
    setValue("userId", selectedItem._id);
    setValue("userInfo", selectedItem);
  };

  const handleSearch = async (searchKeyword: string) => {
    const res = await searchUsers(searchKeyword, "displayName");
    return res;
  };

  return (
    <Container>
      <Title>{tl("licensorName")}</Title>
      <Gap height={20} />
      {!readOnly && (
        <SearchDropdownInput
          title={tl("licensorNameSearch")}
          placeholder={tl("licensorNameSearch")}
          onClickSearch={handleSearch}
          onSelect={(selectedItem: User) => {
            onSelect(selectedItem);
          }}
          renderItem={(item) => `${item.displayName}`}
          size="small"
          blueRequired
        />
      )}
      {selectedUser && (
        <SelectedUserContainer>
          <CustomChip
            label={selectedUser.displayName}
            onClick={handleDelete}
            deletable
          />
        </SelectedUserContainer>
      )}
    </Container>
  );
}
