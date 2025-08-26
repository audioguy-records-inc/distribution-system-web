import { Artist, SnsLink } from "@/types/artist";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ArtistDetail from "./ArtistDetail";
import Facebook from "@/components/icons/sns/Facebook";
import Instagram from "@/components/icons/sns/Instagram";
import TikTok from "@/components/icons/sns/TikTok";
import X from "@/components/icons/sns/X";
import Youtube from "@/components/icons/sns/Youtube";
import { countryList } from "@/constants/country";
import styled from "styled-components";
import { useArtistStore } from "@/stores/use-artist-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useEffect } from "react";

const Container = styled.div``;

const SnsIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  justify-content: center;
`;

const SnsIconWrapper = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ArtistList() {
  const { artists, fetchArtists } = useArtistStore();
  const columns: Column<Artist>[] = [
    {
      header: "아티스트 코드",
      accessor: "artistUniqueId",
      type: "string",
      width: 120,
      align: "center",
    },
    {
      header: "아티스트명",
      accessor: "name",
      type: "string",
      width: 155,
      align: "center",
    },
    {
      header: "국가",
      accessor: "countryCode",
      type: "string",
      width: 155,
      align: "center",
      render: (value) => {
        const country = countryList.find(
          (country) => country.countryCode === value,
        );
        return country?.name || "";
      },
    },
    {
      header: "성별",
      accessor: "genderType",
      type: "component",
      width: 100,
      align: "center",
    },
    {
      header: "유형",
      accessor: "artistType",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      header: "SNS",
      accessor: "snsLinkList",
      type: "component",
      width: 176,
      align: "center",
      render: (value) => {
        const _value = value as SnsLink[];
        if (!_value || _value.length === 0) return null;

        // https 프로토콜이 없는 링크에 추가하는 함수
        const ensureHttps = (url: string): string => {
          if (!url) return "#";
          if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
          }
          return `https://${url}`;
        };

        return (
          <SnsIconsContainer>
            {_value.some((item) => item.site === "instagram") && (
              <SnsIconWrapper
                href={ensureHttps(
                  _value.find((item) => item.site === "instagram")?.link || "#",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </SnsIconWrapper>
            )}
            {_value.some((item) => item.site === "youtube") && (
              <SnsIconWrapper
                href={ensureHttps(
                  _value.find((item) => item.site === "youtube")?.link || "#",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube />
              </SnsIconWrapper>
            )}
            {_value.some((item) => item.site === "twitter") && (
              <SnsIconWrapper
                href={ensureHttps(
                  _value.find((item) => item.site === "twitter")?.link || "#",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <X />
              </SnsIconWrapper>
            )}
            {_value.some((item) => item.site === "facebook") && (
              <SnsIconWrapper
                href={ensureHttps(
                  _value.find((item) => item.site === "facebook")?.link || "#",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </SnsIconWrapper>
            )}
            {_value.some((item) => item.site === "tiktok") && (
              <SnsIconWrapper
                href={ensureHttps(
                  _value.find((item) => item.site === "tiktok")?.link || "#",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTok />
              </SnsIconWrapper>
            )}
          </SnsIconsContainer>
        );
      },
    },
    {
      header: "앨범수",
      accessor: "releaseAlbumCount",
      type: "string",
      width: 100,
      align: "center",
      render: (value) => {
        const albumCount = (value as number) || 0;
        return albumCount > 0 ? albumCount.toString() : "0";
      },
    },
    {
      header: "트랙수",
      accessor: "releaseTrackCount",
      type: "string",
      width: 100,
      align: "center",
      render: (value) => {
        const trackCount = (value as number) || 0;
        return trackCount > 0 ? trackCount.toString() : "0";
      },
    },
  ];

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const renderExpandedContent = (artist: Artist) => {
    return <ArtistDetail artist={artist} />;
  };

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={artists || []}
        expandable={{
          expandedRowRender: renderExpandedContent,
          expandColumnWidth: 50,
        }}
      />
    </Container>
  );
}
