import AnnouncementSearchTypeDropdown, {
  AnnouncementSearchType,
} from "./fragments/AnnouncementSearchTypeDropdown";

import { AnnouncementType } from "@/types/announcement";
import CustomDropdown from "@/components/basic/CustomDropdown";
import Gap from "@/components/basic/Gap";
import SearchInput from "@/components/SearchInput";
import styled from "styled-components";
import { useAnnouncementStore } from "@/stores/use-announcement-store";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

type SearchType = "title" | "text" | "title,text";

export default function AnnouncementSearch() {
  const t = useTranslations("announcement");
  const [selectedType, setSelectedType] =
    useState<AnnouncementSearchType>("ALL");
  const [searchType, setSearchType] = useState<SearchType>("title,text");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchAnnouncements } = useAnnouncementStore();

  const handleSearch = async () => {
    setIsLoading(true);
    const _selectedType = selectedType === "ALL" ? "" : selectedType;
    await searchAnnouncements({
      type: selectedType as AnnouncementType,
      __searchKeyword: searchValue,
      __searchFields: searchType,
      __limit: 20,
    });
    setIsLoading(false);
  };

  const items = [
    {
      key: "title",
      value: t("searchTitle"),
    },
    {
      key: "text",
      value: t("searchContent"),
    },
    {
      key: "title,text",
      value: t("searchTitleContent"),
    },
  ];

  return (
    <Container>
      <AnnouncementSearchTypeDropdown
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <Gap height={16} />
      <RowWrapper>
        <CustomDropdown
          items={items}
          selectedKey={searchType}
          onSelectKey={(key) => setSearchType(key as SearchType)}
        />
        <SearchInput
          placeholder={t("searchPlaceholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClickSearch={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          isLoading={isLoading}
        />
      </RowWrapper>
    </Container>
  );
}
