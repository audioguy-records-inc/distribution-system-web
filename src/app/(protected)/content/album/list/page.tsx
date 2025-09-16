"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AlbumDownloadButton from "./components/fragment/AlbumDownloadButton";
import AlbumFileStatusChecker from "./components/AlbumFileStatusChecker";
import AlbumList from "./components/AlbumList";
import AlbumSearch from "./components/AlbumSearch";
import AlbumUploadButton from "./components/fragment/AlbumUploadButton";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import { useAlbumStore } from "@/stores/use-album-store";

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
  const [statusCheckerKey, setStatusCheckerKey] = useState(0);

  const handleUploadComplete = useCallback(() => {
    // 컴포넌트를 새로 마운트하기 위해 key 변경
    setStatusCheckerKey((prev) => prev + 1);
  }, []);

  return (
    <Container>
      <PageHeader title={"앨범 리스트"} />
      <AlbumSearch />
      <ButtonWrapper>
        <AlbumFileStatusChecker
          key={`album-status-checker-${statusCheckerKey}`}
        />
        <AlbumUploadButton onUploadComplete={handleUploadComplete} />
        <AlbumDownloadButton />
      </ButtonWrapper>

      <AlbumList />
    </Container>
  );
}
