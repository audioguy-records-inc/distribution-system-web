import CustomDropdown from "@/components/basic/CustomDropdown";
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
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "account",
      value: "권리사 ID",
    },
    {
      key: "displayName",
      value: "권리사명",
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
