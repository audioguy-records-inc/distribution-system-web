import CustomDropdown from "@/components/basic/CustomDropdown";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const Container = styled.div``;

export type LicensorContractSearchType =
  | "userContractName"
  | "userInfo.displayName"
  | "userContractUniqueId"
  | "all";

const LicensorContractSearchTypeDropdown = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: LicensorContractSearchType;
  setSelectedType: (type: LicensorContractSearchType) => void;
}) => {
  const tCommon = useTranslations("common");
  const tContract = useTranslations("contract");
  const tLicensor = useTranslations("licensor");
  const items = [
    {
      key: "all",
      value: tCommon("all"),
    },
    {
      key: "userContractName",
      value: tContract("contractName"),
    },
    {
      key: "userInfo.displayName",
      value: tLicensor("licensorName"),
    },
    {
      key: "userContractUniqueId",
      value: tContract("contractCode"),
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) =>
          setSelectedType(key as LicensorContractSearchType)
        }
      />
    </Container>
  );
};

export default LicensorContractSearchTypeDropdown;
