import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import Gap from "@/components/basic/Gap";
import SearchDropdownInput from "@/components/SearchDropdownInput";
import TrashIcon from "@/components/icons/TrashIcon";
import { User } from "@/types/user";
import UserTypeBadge from "@/components/basic/custom-table/components/UserTypeBadge";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${theme.fonts.heading2.medium}
  color: ${theme.colors.gray[800]};
`;

const Required = styled.span`
  ${theme.fonts.heading2.medium}
  color: ${theme.colors.red[600]};
`;

export default function LicensorSearch({
  value,
  onChange,
  readOnly = false,
  user,
  required = false,
}: {
  value: string;
  onChange: (value: string | null) => void;
  readOnly?: boolean;
  user?: User;
  required?: boolean;
}) {
  const tLicensor = useTranslations("licensor");
  const tCommon = useTranslations("common");
  const [selectedUser, setSelectedUser] = useState<User | null>(user || null);
  const { searchUsers } = useUserStore();

  const columns: Column<User>[] = [
    {
      header: tCommon("category"),
      accessor: "type",
      type: "component",
      width: 140,
      align: "center",
      render: (value, record) => {
        return <UserTypeBadge type={record.type} />;
      },
    },
    {
      header: tLicensor("licensorCode"),
      accessor: "account",
      type: "string",
      width: 220,
      align: "center",
    },
    {
      header: tLicensor("licensorName"),
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
      <Title>
        {tLicensor("licensorName")}
        {required && <Required>*</Required>}
      </Title>
      <Gap height={20} />
      {!readOnly && (
        <SearchDropdownInput
          title={tLicensor("licensorNameSearch")}
          placeholder={tLicensor("licensorNameSearch")}
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
