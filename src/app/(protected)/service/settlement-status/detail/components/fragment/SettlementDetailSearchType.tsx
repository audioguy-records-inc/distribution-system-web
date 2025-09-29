import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type SettlementDetailSearchType =
  | "artistList.name"
  | "albumTitle"
  | "trackTitle"
  | "serviceName"
  | "agencyCompanyName"
  | "userInfo.displayName"
  | "userDisplayName,agencyCompanyName"
  | "all";

export default function SettlementDetailSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: SettlementDetailSearchType;
  setSelectedType: (type: SettlementDetailSearchType) => void;
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
    {
      key: "userDisplayName,agencyCompanyName",
      value: "권리자명",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) =>
          setSelectedType(key as SettlementDetailSearchType)
        }
      />
    </Container>
  );
}
