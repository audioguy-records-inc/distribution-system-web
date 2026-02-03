"use client";

import PageHeader from "@/components/PageHeader";
import VideoDownloadButton from "./components/fragment/VideoDownloadButton";
import VideoList from "./components/VideoList";
import VideoSearch from "./components/VideoSearch";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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

export default function VideoListPage() {
  const tVideo = useTranslations("video");

  return (
    <Container>
      <PageHeader title={tVideo("videoList")} />
      <VideoSearch />
      <ButtonWrapper>
        <VideoDownloadButton />
      </ButtonWrapper>
      <VideoList />
    </Container>
  );
}
