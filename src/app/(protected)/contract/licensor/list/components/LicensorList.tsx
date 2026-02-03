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
import { useTranslations } from "next-intl";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div``;

export default function LicensorList({ licensors }: { licensors: User[] }) {
  const tLicensor = useTranslations("licensor");
  const tCommon = useTranslations("common");
  const tContent = useTranslations("content");
  const { user } = useAuthStore();
  const { fetchUsers } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);

  const columns: Column<User>[] = [
    {
      header: tLicensor("licensorCode"),
      accessor: "account",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      header: tCommon("category"),
      accessor: "type",
      type: "component",
      width: 150,
      align: "center",
      render: (value, record) => {
        return <UserTypeBadge type={record.type} />;
      },
    },
    {
      header: tLicensor("licensorName"),
      accessor: "displayName",
      type: "string",
      width: 280,
      align: "center",
    },
    {
      header: tContent("albumCount"),
      accessor: "albumCount",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      header: tCommon("active"),
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
