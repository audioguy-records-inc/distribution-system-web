import Album, { ArtistInfo, TitleLanguage } from "@/types/album";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { Artist } from "@/types/artist";
import Link from "next/link";
import { User } from "@/types/user";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAlbumStore } from "@/stores/use-album-store";
import { useEffect } from "react";

const Container = styled.div``;

const RenderText = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
`;

const RenderLinkText = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.blue[600]};
  text-decoration: none;
`;

export default function AlbumList() {
  const { albums, fetchAlbums } = useAlbumStore();
  const columns: Column<Album>[] = [
    {
      header: "앨범 코드",
      accessor: "albumUniqueId",
      type: "string",
      width: 140,
      align: "center",
    },
    {
      header: "앨범명",
      accessor: "titleList",
      type: "string",
      width: 103,
      align: "center",
      render: (value, row, index) => {
        const titleList = value as TitleLanguage[];
        const albumId = row._id;

        // 우선순위에 따라 앨범명 선택
        let title = "";

        const koTitle = titleList.find((item) => item.ko)?.ko;
        if (koTitle)
          return (
            <Link
              href={`/content/album/list/${albumId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RenderLinkText>{koTitle}</RenderLinkText>
            </Link>
          );

        const enTitle = titleList.find((item) => item.en)?.en;
        if (enTitle)
          return (
            <Link
              href={`/content/album/list/${albumId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <RenderLinkText>{enTitle}</RenderLinkText>
            </Link>
          );

        // 5. 첫 번째 값 사용
        if (titleList.length > 0) {
          const firstItem = titleList[0];
          const firstKey = Object.keys(firstItem)[0] as keyof TitleLanguage;
          title = firstItem[firstKey] || "";
        }

        return (
          <Link
            href={`/content/album/list/${albumId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <RenderLinkText>{title}</RenderLinkText>
          </Link>
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
      header: "권리사",
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
    fetchAlbums();
  }, []);

  return (
    <Container>
      <CustomTable columns={columns} data={albums} />
    </Container>
  );
}
