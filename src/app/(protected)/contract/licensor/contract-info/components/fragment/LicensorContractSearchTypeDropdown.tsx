import CustomDropdown from "@/components/basic/CustomDropdown";
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
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "userContractName",
      value: "계약명",
    },
    {
      key: "userInfo.displayName",
      value: "권리자명",
    },
    {
      key: "userContractUniqueId",
      value: "계약 코드",
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
