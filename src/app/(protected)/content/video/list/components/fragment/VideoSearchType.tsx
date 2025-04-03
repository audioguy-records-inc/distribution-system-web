import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type VideoSearchType =
  | "releaseArtistList.name"
  | "titleList"
  | "trackList.title"
  | "all";

export default function VideoSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: VideoSearchType;
  setSelectedType: (type: VideoSearchType) => void;
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
      value: "영상명",
    },
    {
      key: "trackList.title",
      value: "트랙명",
    },
    {
      key: "videoUniqueId",
      value: "영상 코드",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as VideoSearchType)}
      />
    </Container>
  );
}
