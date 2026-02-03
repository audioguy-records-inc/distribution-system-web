"use client";

import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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
  const tc = useTranslations("common");
  const t = useTranslations("content");
  const ta = useTranslations("artist");
  const tt = useTranslations("track");
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
      value: t("albumName"),
    },
    {
      key: "trackList.titleList.ko,trackList.titleList.en",
      value: tt("trackName"),
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
      value: t("label"),
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
