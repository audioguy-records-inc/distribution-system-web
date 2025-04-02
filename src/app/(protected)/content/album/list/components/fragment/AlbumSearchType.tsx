import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type AlbumSearchType =
  | "releaseArtistList.name"
  | "titleList"
  | "trackList.title"
  | "all";

export default function AlbumSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: AlbumSearchType;
  setSelectedType: (type: AlbumSearchType) => void;
}) {
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "releaseArtistList.name",
      value: "아티스트명",
    },
    {
      key: "titleList.KR,titleList.EN,titleList.JP,titleList.CN,titleList.DOM,titleList.INT",
      value: "앨범명",
    },
    {
      key: "trackList.title",
      value: "트랙명",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as AlbumSearchType)}
      />
    </Container>
  );
}
