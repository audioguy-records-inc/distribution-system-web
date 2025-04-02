"use client";

import { useEffect, useState } from "react";

import AddNewArtist from "./components/AddNewArtist";
import { Artist } from "@/types/artist";
import ArtistDownloadButton from "./components/ArtistDownloadButton";
import ArtistList from "./components/ArtistList";
import Gap from "@/components/basic/Gap";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useArtistStore } from "@/stores/use-artist-store";

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
  const { artists, searchArtists } = useArtistStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists);

  useEffect(() => {
    setFilteredArtists(artists);
  }, [artists]);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setFilteredArtists(artists);
      return;
    }

    const results = await searchArtists(searchValue, "name");
    setFilteredArtists(results);
  };

  return (
    <Container>
      <PageHeader title={"아티스트 리스트"} />
      <SearchContainer>
        <SearchInput
          placeholder="아티스트 검색"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClickSearch={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          // onClear={handleClearSearch}
        />
        <ButtonWrapper>
          <AddNewArtist />
          <ArtistDownloadButton artists={filteredArtists} />
        </ButtonWrapper>
      </SearchContainer>
      <Gap height={32} />
      <ArtistList artists={filteredArtists} />
    </Container>
  );
}
