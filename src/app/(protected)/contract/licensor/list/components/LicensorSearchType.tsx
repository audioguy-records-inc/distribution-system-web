import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type SearchType = "_id" | "displayName" | "all";

const LicensorSearchType = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: SearchType;
  setSelectedType: (type: SearchType) => void;
}) => {
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "_id",
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
        onSelectKey={(key) => setSelectedType(key as SearchType)}
      />
    </Container>
  );
};

export default LicensorSearchType;
