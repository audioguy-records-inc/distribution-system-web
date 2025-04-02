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
import Track from "@/types/track";
import TrackSearchModal from "@/components/TrackSearchModal";
import TrashIcon from "@/components/icons/TrashIcon";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useArtistStore } from "@/stores/use-artist-store";
import { useTrackStore } from "@/stores/use-track-store";

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

export default function TrackSearch({
  value,
  onChange,
  trackList,
  readOnly = false,
  placeholder,
  label,
  modalHeader,
}: {
  value: string[] | null;
  onChange: (value: string[] | null) => void;
  readOnly?: boolean;
  placeholder?: string;
  label?: string;
  modalHeader?: string;
  trackList: Track[];
}) {
  const { searchTracks } = useTrackStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<Track>[] = [
    {
      header: "트랙 코드",
      accessor: "trackUniqueId",
      type: "string",
      width: 140,
      align: "center",
    },
    {
      header: "트랙명",
      accessor: "title",
      type: "string",
      width: 337,
      align: "center",
    },
    {
      header: "아티스트명",
      accessor: "releaseArtistList",
      type: "string",
      width: 160,
      align: "center",
      render: (value, record) => {
        const _value = value as string[];
        return _value[0];
      },
    },
    {
      header: "발매일",
      accessor: "utcReleasedAt",
      type: "string",
      width: 120,
      align: "center",
      render: (value, record) => {
        const _value = value as Date;
        return _value ? moment(_value).format("YYYY-MM-DD") : "";
      },
    },
    {
      header: "",
      accessor: "action" as keyof Track,
      type: "button",
      width: 50,
      icon: <TrashIcon />,
      onClick: (record, rowIndex) => {
        onChange(value ? value.filter((track) => track !== record._id) : null);
      },
    },
  ];

  const handleRegisterTrack = (track: Track) => {
    onChange(value ? [...value, track._id || ""] : [track._id || ""]);
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
          <TrackSearchModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            header={modalHeader}
            onChange={onChange}
            value={value}
            onRegister={handleRegisterTrack}
          />
        </>
      )}
      <Gap height={20} />
      <CustomTable
        columns={columns}
        data={trackList}
        size="small"
        readOnly={readOnly}
      />
    </Container>
  );
}
