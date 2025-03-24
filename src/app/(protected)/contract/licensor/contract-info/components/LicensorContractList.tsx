import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { User, UserType } from "@/types/user";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import LicensorContractDetail from "./LicensorContractDetail";
import UserContract from "@/types/user-contract";
import UserTypeBadge from "@/components/basic/custom-table/components/UserTypeBadge";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useEffect } from "react";
import { useUserContractStore } from "@/stores/use-user-contract-store";

const Container = styled.div``;

export default function LicensorContractList({
  userContracts,
}: {
  userContracts: UserContract[];
}) {
  const { user } = useAuthStore();
  const { fetchUserContracts } = useUserContractStore();

  useEffect(() => {
    if (user) {
      fetchUserContracts();
    }
  }, [user, fetchUserContracts]);
  console.log("moonsae userContracts", userContracts);
  const columns: Column<UserContract>[] = [
    {
      header: "계약 코드",
      accessor: "userContractUniqueId",
      type: "string",
      width: 120,
      align: "center",
    },
    {
      header: "구분",
      accessor: "userInfo",
      type: "string",
      width: 120,
      align: "center",
      render: (value, record) => {
        const _value = value as User;
        const type = _value?.type;

        if (!type) {
          return "";
        }

        return <UserTypeBadge type={type} />;
      },
    },
    {
      header: "권리사명",
      accessor: "userInfo",
      type: "string",
      width: 200,
      align: "center",
      render: (value) => {
        const _value = value as User;
        return _value?.displayName;
      },
    },
    {
      header: "계약명",
      accessor: "userContractName",
      type: "string",
      width: 267,
      align: "center",
    },
    {
      header: "활성 여부",
      accessor: "isContractEnabled",
      type: "component",
      width: 170,
      align: "center",

      render: (value) => <ActivateStateBadge isActive={Boolean(value)} />,
    },
  ];

  const renderExpandedContent = (licensorContract: UserContract) => {
    return <LicensorContractDetail licensorContract={licensorContract} />;
  };

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={userContracts || []}
        expandable={{
          expandedRowRender: renderExpandedContent,
          expandColumnWidth: 50,
        }}
      />
    </Container>
  );
}
