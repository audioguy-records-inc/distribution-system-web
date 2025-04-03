import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export type AnnouncementSearchType =
  | "ETC"
  | "TRANSMISSION"
  | "SETTLEMENT"
  | "ALL";

export default function AnnouncementSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: AnnouncementSearchType;
  setSelectedType: (type: AnnouncementSearchType) => void;
}) {
  const items = [
    {
      key: "ALL",
      value: "전체",
    },
    {
      key: "TRANSMISSION",
      value: "전송",
    },
    {
      key: "SETTLEMENT",
      value: "정산",
    },
    {
      key: "ETC",
      value: "기타",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        label={"구분"}
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as AnnouncementSearchType)}
      />
    </Container>
  );
}
