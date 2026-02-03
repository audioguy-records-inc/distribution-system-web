import { ArtistInfo, TitleLanguage } from "@/types/album";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import AddNewArtist from "@/app/(protected)/content/artist/components/AddNewArtist";
import { Artist } from "@/types/artist";
import ButtonFilledPrimary from "./basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "./basic/buttons/ButtonOutlinedSecondary";
import { ClipLoader } from "react-spinners";
import Gap from "./basic/Gap";
import Modal from "react-modal";
import SearchInput from "./SearchInput";
import Track from "@/types/track";
import XIcon from "./icons/XIcon";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useArtistStore } from "@/stores/use-artist-store";
import { useState } from "react";
import { useTrackStore } from "@/stores/use-track-store";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 1066px;
  height: 640px;
  padding: 56px 64px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  ${theme.fonts.title1.medium};
  color: ${theme.colors.gray[800]};
`;

const CloseButton = styled(XIcon)`
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface TrackSearchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onChange: (value: string[] | null) => void;
  header?: string;
  placeholder?: string;
  value: string[] | null;
  onRegister?: (track: Track) => void;
}

const TrackSearchModal = ({
  isOpen,
  onRequestClose,
  header,
  placeholder,
  onChange,
  value,
  onRegister,
}: TrackSearchModalProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedTrackList, setSearchedTrackList] = useState<Track[]>([]);

  const { searchTracks, isLoading } = useTrackStore();
  const tTrack = useTranslations("track");
  const tArtist = useTranslations("artist");
  const tContent = useTranslations("content");
  const tCommon = useTranslations("common");
  const tToastTrack = useTranslations("toast.track");

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      const res = await searchTracks(
        searchValue,
        "title,trackUniqueId,UCI,ISRC",
      );
      setSearchedTrackList(res);
    } catch (error) {
      toast.error(tToastTrack("trackUpdateError"));
    } finally {
    }
  };

  const handleCloseModal = () => {
    onRequestClose();
    setSearchValue("");
    setSearchedTrackList([]);
  };

  const columns: Column<Track>[] = [
    // {
    //   header: "트랙 코드",
    //   accessor: "trackUniqueId",
    //   type: "string",
    //   width: 140,
    //   align: "center",
    // },
    {
      header: tTrack("trackName"),
      accessor: "titleList",
      type: "string",
      width: 300,
      align: "center",
      render: (value, record) => {
        const _value = value as TitleLanguage[];
        return _value?.[0]?.ko || "";
      },
    },
    {
      header: tTrack("trackArtist"),
      accessor: "releaseArtistList",
      type: "string",
      width: 100,
      align: "center",
      render: (value, record) => {
        const _value = value as ArtistInfo[];
        return _value.map((artist) => artist.name).join(", ");
      },
    },
    {
      header: tContent("releaseDate"),
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
      type: "component",
      align: "center",
      width: 110,
      render: (_value, record) => {
        const isAlreadySelected = value?.some(
          (trackId) => trackId === record._id,
        );

        return (
          <ButtonOutlinedSecondary
            size="small"
            label={isAlreadySelected ? tCommon("registered") : tCommon("register")}
            onClick={() => {
              if (isAlreadySelected) {
                toast.error(tToastTrack("alreadyRegistered"));
                return;
              }

              onRegister?.(record);
              toast.success(tToastTrack("registered"));
            }}
            disabled={isAlreadySelected}
          />
        );
      },
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <HeaderWrapper>
          <Header>{header}</Header>
          <CloseButton onClick={handleCloseModal} />
        </HeaderWrapper>

        <Gap height={42} />
        <SearchWrapper>
          <SearchInput
            placeholder={placeholder || tCommon("search")}
            size="small"
            isLoading={isLoading}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClickSearch={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <AddNewArtist />
        </SearchWrapper>
        <Gap height={32} />
        <TableContainer>
          <CustomTable columns={columns} data={searchedTrackList} />
        </TableContainer>
      </Container>
    </Modal>
  );
};

export default TrackSearchModal;
