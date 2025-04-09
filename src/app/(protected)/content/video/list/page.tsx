"use client";

import PageHeader from "@/components/PageHeader";
import VideoDownloadButton from "./components/fragment/VideoDownloadButton";
import VideoList from "./components/VideoList";
import VideoSearch from "./components/VideoSearch";
import styled from "styled-components";

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
  return (
    <Container>
      <PageHeader title="영상 리스트" />
      <VideoSearch />
      <ButtonWrapper>
        <VideoDownloadButton />
      </ButtonWrapper>
      <VideoList />
    </Container>
  );
}
