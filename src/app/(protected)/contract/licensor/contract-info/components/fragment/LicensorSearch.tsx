import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import Gap from "@/components/basic/Gap";
import SearchDropdownInput from "@/components/SearchDropdownInput";
import TrashIcon from "@/components/icons/TrashIcon";
import { User } from "@/types/user";
import UserContract from "@/types/user-contract";
import UserTypeBadge from "@/components/basic/custom-table/components/UserTypeBadge";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

const Title = styled.div`
  ${theme.fonts.heading2.medium}
  color: ${theme.colors.gray[800]};
`;

export default function LicensorSearch({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange: (value: string | null) => void;
  readOnly?: boolean;
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { searchUsers } = useUserStore();

  const columns: Column<User>[] = [
    {
      header: "권리사명",
      accessor: "displayName",
      type: "component",
      width: 140,
      align: "center",
      render: (value, record) => {
        return <UserTypeBadge type={record.type} />;
      },
    },
    {
      header: "권리사 ID",
      accessor: "account",
      type: "string",
      width: 220,
      align: "center",
    },
    {
      header: "권리사명",
      accessor: "displayName",
      type: "string",
      width: 449,
      align: "center",
    },
    {
      header: "",
      accessor: "action" as keyof User,
      type: "button",
      icon: <TrashIcon />,
      onClick: (record, rowIndex) => {
        setSelectedUser(null);
        onChange(null);
      },
    },
  ];

  const onSelect = (selectedItem: User) => {
    setSelectedUser(selectedItem);
    onChange(selectedItem._id);
  };

  const handleSearch = async (searchKeyword: string) => {
    const res = await searchUsers(searchKeyword, "displayName");
    return res;
  };

  return (
    <Container>
      <Title>권리사명</Title>
      <Gap height={12} />
      {!readOnly && (
        <SearchDropdownInput
          title="권리사명 검색"
          placeholder="권리사명 검색"
          onClickSearch={handleSearch}
          onSelect={(selectedItem: User) => {
            onSelect(selectedItem);
          }}
          renderItem={(item) => item.displayName}
          size="small"
        />
      )}
      {selectedUser && (
        <CustomTable
          columns={columns}
          data={[selectedUser]}
          size="small"
          readOnly={readOnly}
        />
      )}
    </Container>
  );
}
