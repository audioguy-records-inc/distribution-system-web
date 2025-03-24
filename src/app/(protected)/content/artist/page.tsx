"use client";

import AddNewArtist from "./components/AddNewArtist";
import ArtistList from "./components/ArtistList";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useArtistStore } from "@/stores/use-artist-store";
import { useState } from "react";

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
  const { artists } = useArtistStore();
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <Container>
      <PageHeader title={"아티스트 리스트"} />
      <SearchContainer>
        <SearchInput
          placeholder="아티스트 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClickSearch={() => {}}
        />
        <ButtonWrapper>
          <AddNewArtist />
        </ButtonWrapper>
      </SearchContainer>

      <ArtistList artists={artists} />
    </Container>
  );
}
