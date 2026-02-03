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
import { useTranslations } from "next-intl";
import { useUserContractStore } from "@/stores/use-user-contract-store";

const Container = styled.div``;

export default function LicensorContractList({
  userContracts,
}: {
  userContracts: UserContract[];
}) {
  const tContract = useTranslations("contract");
  const tLicensor = useTranslations("licensor");
  const tCommon = useTranslations("common");
  const { user } = useAuthStore();
  const { fetchUserContracts } = useUserContractStore();

  useEffect(() => {
    if (user) {
      fetchUserContracts();
    }
  }, [user, fetchUserContracts]);

  const columns: Column<UserContract>[] = [
    {
      header: tContract("contractCode"),
      accessor: "userContractUniqueId",
      type: "string",
      width: 120,
      align: "center",
    },
    {
      header: tCommon("category"),
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
      header: tLicensor("licensorName"),
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
      header: tContract("contractName"),
      accessor: "userContractName",
      type: "string",
      width: 267,
      align: "center",
    },
    {
      header: tContract("contractRate"),
      accessor: "contractRate",
      type: "string",
      width: 120,
      align: "center",
      render: (value) => {
        const _value = value as number;
        return `${
          value !== undefined ? (_value * 100).toFixed(0).toString() : ""
        }%`;
      },
    },
    {
      header: tCommon("active"),
      accessor: "isContractEnabled",
      type: "component",
      width: 170,
      align: "center",

      render: (value) => <ActivateStateBadge isActive={Boolean(value)} />,
    },
    {
      header: tContract("contractType"),
      accessor: "userContractType",
      type: "string",
      width: 120,
      align: "center",
      render: (value): string => {
        const typeMap: Record<string, string> = {
          GENERAL: tContract("typeNormal"),
          INVESTMENT: tContract("typeInvestment"),
          MG: tContract("typeMG"),
        };
        return typeMap[value as string] || (value as string);
      },
    },
    {
      header: tContract("businessType"),
      accessor: "userContractBusinessType",
      type: "string",
      width: 120,
      align: "center",
      render: (value): string => {
        const businessTypeMap: Record<string, string> = {
          INDIVIDUAL: tContract("typeIndividual"),
          INDIVIDUAL_BUSINESS: tContract("typeIndividualBusiness"),
          CORPORATION_BUSINESS: tContract("typeCorporateBusiness"),
        };
        return businessTypeMap[value as string] || (value as string);
      },
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
