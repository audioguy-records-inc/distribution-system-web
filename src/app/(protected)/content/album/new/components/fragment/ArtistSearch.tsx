import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import { Artist } from "@/types/artist";
import { ArtistInfo } from "@/types/album";
import ArtistSearchModal from "@/components/ArtistSearchModal";
import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import SearchDropdownInput from "@/components/SearchDropdownInput";
import SearchIcon from "@/components/icons/SearchIcon";
import SearchInput from "@/components/SearchInput";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useArtistStore } from "@/stores/use-artist-store";

const Container = styled.div``;

const Label = styled.div`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

const SearchButton = styled.div`
  width: 320px;
  height: 42px;
  border-radius: 6px;
  padding-left: 12px;
  padding-right: 8px;
  border: 1px solid ${theme.colors.gray[50]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SearchButtonText = styled.span`
  ${theme.fonts.body2.regular}
  color: ${theme.colors.gray[300]};
`;

export default function ArtistSearch({
  value,
  onChange,
  readOnly = false,
  placeholder,
  label,
  modalHeader,
}: {
  value: ArtistInfo[] | null;
  onChange: (value: ArtistInfo[] | null) => void;
  readOnly?: boolean;
  placeholder?: string;
  label?: string;
  modalHeader?: string;
}) {
  const [selectedArtists, setSelectedArtists] = useState<ArtistInfo[]>(
    value ? value : [],
  );
  const { searchArtists } = useArtistStore();
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const { fetchArtist } = useArtistStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArtistList = async () => {
      if (selectedArtists.length > 0) {
        const _artistList = selectedArtists.map((artist) => {
          return fetchArtist(artist.artistId);
        });

        const artists = await Promise.all(_artistList);

        if (artists.length > 0) {
          setArtistList(artists.filter((artist) => artist !== null));
        }
      }
    };

    fetchArtistList();
  }, [selectedArtists]);

  const columns: Column<Artist>[] = [
    {
      header: "아티스트 코드",
      accessor: "artistUniqueId",
      type: "string",
      width: 140,
      align: "center",
    },
    {
      header: "아티스트명",
      accessor: "name",
      type: "string",
      width: 337,
      align: "center",
    },
    {
      header: "도메인",
      accessor: "countryCode",
      type: "string",
      width: 160,
      align: "center",
      render: (value, record) => {
        return record.countryCode;
      },
    },
    {
      header: "성별",
      accessor: "genderType",
      type: "string",
      width: 120,
      align: "center",
      render: (value, record) => {
        return record.genderType;
      },
    },
    {
      header: "",
      accessor: "action" as keyof Artist,
      type: "button",
      icon: <TrashIcon />,
      onClick: (record, rowIndex) => {
        setSelectedArtists(
          selectedArtists.filter((artist) => artist.artistId !== record._id),
        );
        onChange(selectedArtists.length > 0 ? selectedArtists : null);
      },
    },
  ];

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);

    const res = await searchArtists(keyword, "name");

    setIsLoading(false);
    return res;
  };

  const handleSelectArtist = (selectedItem: Artist) => {
    const artistInfo: ArtistInfo = {
      artistId: selectedItem._id,
      name: selectedItem.name,
      mainRole: "",
      subRole: "",
    };

    setSelectedArtists([...selectedArtists, artistInfo]);
    onChange([...selectedArtists, artistInfo]);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Gap height={8} />
      {!readOnly && (
        <>
          <SearchButton onClick={() => setIsModalOpen(true)}>
            <SearchButtonText>{placeholder || " "}</SearchButtonText>
            <SearchIcon width={18} height={18} />
          </SearchButton>
          <ArtistSearchModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onConfirm={() => setIsModalOpen(false)}
            isLoading={isLoading}
            header={modalHeader}
          />
        </>
      )}
      <Gap height={20} />
      <CustomTable
        columns={columns}
        data={artistList}
        size="small"
        readOnly={readOnly}
      />
    </Container>
  );
}
