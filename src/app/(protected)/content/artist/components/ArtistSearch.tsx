import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useArtistStore } from "@/stores/use-artist-store";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Container = styled.div``;

export default function ArtistSearch() {
  const ta = useTranslations("artist");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { artists, searchArtists } = useArtistStore();

  const handleSearch = async () => {
    setIsLoading(true);
    await searchArtists(searchValue, "name,artistUniqueId");
    setIsLoading(false);
  };

  return (
    <Container>
      <SearchInput
        placeholder={ta("artistSearch")}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClickSearch={handleSearch}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        isLoading={isLoading}
      />
    </Container>
  );
}
