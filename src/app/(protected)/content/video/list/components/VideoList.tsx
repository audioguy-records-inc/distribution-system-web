import Album, { ArtistInfo, TitleLanguage } from "@/types/album";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { Artist } from "@/types/artist";
import Link from "next/link";
import { User } from "@/types/user";
import Video from "@/types/video";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAlbumStore } from "@/stores/use-album-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVideoStore } from "@/stores/use-video-store";

const Container = styled.div``;

const RenderText = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
`;

const RenderLinkText = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.blue[600]};
  text-decoration: none;
  cursor: pointer;
`;

export default function VideoList() {
  const { videos, fetchVideos } = useVideoStore();
  const router = useRouter();
  const columns: Column<Video>[] = [
    {
      header: "영상 코드",
      accessor: "videoUniqueId",
      type: "string",
      width: 140,
      align: "center",
    },
    {
      header: "영상명",
      accessor: "titleList",
      type: "string",
      width: 103,
      align: "center",
      render: (value, row, index) => {
        const titleList = value as TitleLanguage[];
        const videoId = row._id;

        // 우선순위에 따라 앨범명 선택
        let title = "";

        const koTitle = titleList.find((item) => item.ko)?.ko;
        if (koTitle) return <RenderLinkText>{koTitle}</RenderLinkText>;

        const enTitle = titleList.find((item) => item.en)?.en;
        if (enTitle) return <RenderLinkText>{enTitle}</RenderLinkText>;

        // 5. 첫 번째 값 사용
        if (titleList.length > 0) {
          const firstItem = titleList[0];
          const firstKey = Object.keys(firstItem)[0] as keyof TitleLanguage;
          title = firstItem[firstKey] || "";
        }

        return <RenderLinkText>{title}</RenderLinkText>;
      },
    },
    {
      header: "트랙명",
      accessor: "trackList",
      type: "string",
      width: 103,
      align: "center",
      render: (value, row, index) => {
        const trackList = value as { trackId: string; title: string }[];
        return (
          <RenderText>
            {trackList.length > 0 ? trackList[0].title : ""}
          </RenderText>
        );
      },
    },
    {
      header: "아티스트",
      accessor: "releaseArtistList",
      type: "string",
      width: 120,
      align: "center",
      render: (value, row, index) => {
        const artistList = value as ArtistInfo[];
        return (
          <RenderText>
            {artistList.length > 0 ? artistList[0].name : ""}
          </RenderText>
        );
      },
    },
    {
      header: "발매일",
      accessor: "utcReleasedAt",
      type: "string",
      width: 132,
      align: "center",
      render: (value, row, index) => {
        const releasedAt = value as Date;
        return (
          <RenderText>
            {moment(releasedAt).utcOffset(9).format("YYYY. MM. DD")}
          </RenderText>
        );
      },
    },
    {
      header: "서비스 일시",
      accessor: "utcServiceStartedAt",
      type: "string",
      width: 132,
      align: "center",
      render: (value, row, index) => {
        const serviceStartedAt = value as Date;
        return (
          <RenderText>
            {moment(serviceStartedAt).utcOffset(9).format("YYYY. MM. DD HH:mm")}
          </RenderText>
        );
      },
    },
    {
      header: "권리자",
      accessor: "userInfo",
      type: "string",
      width: 120,
      align: "center",
      render: (value, row, index) => {
        const userInfo = value as User;
        return <RenderText>{userInfo.displayName}</RenderText>;
      },
    },
    {
      header: "기획사",
      accessor: "agencyCompanyName",
      type: "string",
      width: 120,
      align: "center",
    },
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleClickVideoItem = (record: Video) => {
    router.push(`/content/video/list/${record._id}`);
  };

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={videos}
        onClick={handleClickVideoItem}
      />
    </Container>
  );
}
