"use client";

import AlbumDownloadButton from "./components/fragment/AlbumDownloadButton";
import AlbumList from "./components/AlbumList";
import AlbumSearch from "./components/AlbumSearch";
import AlbumUploadButton from "./components/fragment/AlbumUploadButton";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

export default function AlbumListPage() {
  return (
    <Container>
      <PageHeader title={"앨범 리스트"} />
      <AlbumSearch />
      <ButtonWrapper>
        <AlbumUploadButton />
        <AlbumDownloadButton />
      </ButtonWrapper>

      <AlbumList />
    </Container>
  );
}
