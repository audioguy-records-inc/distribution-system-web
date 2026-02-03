import CustomDropdown from "@/components/basic/CustomDropdown";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const Container = styled.div``;

export type LicensorSearchType = "account" | "displayName" | "all";

const LicensorSearchTypeDropdown = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: LicensorSearchType;
  setSelectedType: (type: LicensorSearchType) => void;
}) => {
  const tCommon = useTranslations("common");
  const tLicensor = useTranslations("licensor");
  const items = [
    {
      key: "all",
      value: tCommon("all"),
    },
    {
      key: "account",
      value: tLicensor("licensorCode"),
    },
    {
      key: "displayName",
      value: tLicensor("licensorName"),
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as LicensorSearchType)}
      />
    </Container>
  );
};

export default LicensorSearchTypeDropdown;
