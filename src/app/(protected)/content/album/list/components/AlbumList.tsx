import Album, { ArtistInfo, TitleLanguage } from "@/types/album";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import { Artist } from "@/types/artist";
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

        // 우선순위에 따라 앨범명 선택
        let title = "";

        // 1. KR 확인
        const krTitle = titleList.find((item) => item.KR)?.KR;
        if (krTitle) return <div>{krTitle}</div>;

        // 2. DOM 확인
        const domTitle = titleList.find((item) => item.DOM)?.DOM;
        if (domTitle) return <div>{domTitle}</div>;

        // 3. EN 확인
        const enTitle = titleList.find((item) => item.EN)?.EN;
        if (enTitle) return <div>{enTitle}</div>;

        // 4. INT 확인
        const intTitle = titleList.find((item) => item.INT)?.INT;
        if (intTitle) return <div>{intTitle}</div>;

        // 5. 첫 번째 값 사용
        if (titleList.length > 0) {
          const firstItem = titleList[0];
          const firstKey = Object.keys(firstItem)[0] as keyof TitleLanguage;
          title = firstItem[firstKey] || "";
        }

        return <RenderText>{title}</RenderText>;
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
      header: "권리사명",
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
      header: "기획사명",
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
