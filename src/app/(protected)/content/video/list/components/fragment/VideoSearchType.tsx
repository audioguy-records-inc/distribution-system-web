import CustomDropdown from "@/components/basic/CustomDropdown";
import { useTranslations } from "next-intl";
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
  const tc = useTranslations("common");
  const tv = useTranslations("video");
  const tt = useTranslations("track");
  const ta = useTranslations("artist");
  const items = [
    {
      key: "all",
      value: tc("all"),
    },
    {
      key: "releaseArtistList.name",
      value: ta("artistName"),
    },
    {
      key: "titleList.ko,titleList.en,titleList.ja,titleList.zh,titleList.zh-Hans,titleList.zh-Hant",
      value: tv("videoName"),
    },
    {
      key: "trackList.title",
      value: tt("trackName"),
    },
    {
      key: "videoUniqueId",
      value: tv("videoCode"),
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
