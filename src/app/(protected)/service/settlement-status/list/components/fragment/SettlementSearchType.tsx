import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type SettlementSearchType =
  | "artistList.name"
  | "albumTitle"
  | "trackTitle"
  | "all";

export default function SettlementSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: SettlementSearchType;
  setSelectedType: (type: SettlementSearchType) => void;
}) {
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "albumTitle",
      value: "앨범명",
    },
    {
      key: "trackTitle",
      value: "트랙명",
    },
    {
      key: "artistList.name",
      value: "아티스트명",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as SettlementSearchType)}
      />
    </Container>
  );
}
