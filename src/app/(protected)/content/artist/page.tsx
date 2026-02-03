"use client";

import { useEffect, useState } from "react";

import AddNewArtist from "./components/AddNewArtist";
import { Artist } from "@/types/artist";
import ArtistDownloadButton from "./components/ArtistDownloadButton";
import ArtistList from "./components/ArtistList";
import ArtistSearch from "./components/ArtistSearch";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export default function ArtistPage() {
  const tArtist = useTranslations("artist");

  return (
    <Container>
      <PageHeader title={tArtist("artistList")} />
      <SearchContainer>
        <ArtistSearch />
        <ButtonWrapper>
          <AddNewArtist />
          <ArtistDownloadButton />
        </ButtonWrapper>
      </SearchContainer>
      <Gap height={32} />
      <ArtistList />
    </Container>
  );
}
