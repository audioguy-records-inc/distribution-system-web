import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type AlbumSearchType =
  | "releaseArtistList.name"
  | "titleList.ko,titleList.en,titleList.ja,titleList.zh,titleList.zh-Hans,titleList.zh-Hant"
  | "trackList.titleList.ko,trackList.titleList.en"
  | "trackList.ISRC"
  | "UPC"
  | "agencyCompanyName"
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
      key: "titleList.ko,titleList.en,titleList.ja,titleList.zh,titleList.zh-Hans,titleList.zh-Hant",
      value: "앨범명",
    },
    {
      key: "trackList.titleList.ko,trackList.titleList.en",
      value: "트랙명",
    },
    {
      key: "trackList.ISRC",
      value: "ISRC",
    },
    {
      key: "UPC",
      value: "UPC",
    },
    {
      key: "agencyCompanyName",
      value: "레이블(기획사)",
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
