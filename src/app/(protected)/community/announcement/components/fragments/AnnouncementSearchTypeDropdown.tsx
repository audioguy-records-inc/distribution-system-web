import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useAnnouncementStore } from "@/stores/use-announcement-store";

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
  const { searchAnnouncements } = useAnnouncementStore();
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
  const handleSearch = async (key: AnnouncementSearchType) => {
    const _type = key === "ALL" ? null : key;
    if (_type) {
      await searchAnnouncements({
        type: _type,
        __searchKeyword: "",
      });
    } else {
      await searchAnnouncements({
        __searchKeyword: "",
      });
    }
  };

  return (
    <Container>
      <CustomDropdown
        label={"구분"}
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => {
          const _key = key as AnnouncementSearchType;
          setSelectedType(_key);
          handleSearch(_key);
        }}
      />
    </Container>
  );
}
