import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ActivateStateBadge from "@/components/basic/custom-table/components/ActivateStateBadge";
import Dsp from "@/components/basic/custom-table/components/Dsp";
import DspContract from "@/types/dsp-contract";
import DspContractInfo from "../../../dsp/list/components/DspContractDetail";
import LicensorDetail from "./LicensorDetail";
import LicensorInput from "./fragment/LicnsorInput";
import { User } from "@/types/user";
import UserTypeBadge from "@/components/basic/custom-table/components/UserTypeBadge";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useEffect } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

export default function LicensorList({ licensors }: { licensors: User[] }) {
  const { user } = useAuthStore();
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const columns: Column<User>[] = [
    {
      header: "권리사 ID",
      accessor: "account",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      header: "구분",
      accessor: "type",
      type: "component",
      width: 190,
      align: "center",
      render: (value, record) => {
        return <UserTypeBadge type={record.type} />;
      },
    },
    {
      header: "권리사명",
      accessor: "displayName",
      type: "string",
      width: 417,
      align: "center",
    },
    {
      header: "활성 여부",
      accessor: "isEnabled",
      type: "component",
      width: 170,
      align: "center",

      render: (value) => <ActivateStateBadge isActive={Boolean(value)} />,
    },
  ];

  const renderExpandedContent = (licensor: User) => {
    return <LicensorDetail licensor={licensor} />;
  };

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={licensors || []}
        expandable={{
          expandedRowRender: renderExpandedContent,
          expandColumnWidth: 50,
        }}
      />
    </Container>
  );
}
