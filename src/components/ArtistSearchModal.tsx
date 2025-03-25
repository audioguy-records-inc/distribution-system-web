import AddNewArtist from "@/app/(protected)/content/artist/components/AddNewArtist";
import ButtonFilledPrimary from "./basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "./basic/buttons/ButtonOutlinedSecondary";
import { ClipLoader } from "react-spinners";
import Gap from "./basic/Gap";
import Modal from "react-modal";
import SearchInput from "./SearchInput";
import XIcon from "./icons/XIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useArtistStore } from "@/stores/use-artist-store";
import { useState } from "react";

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

interface ArtistSearchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;

  isLoading?: boolean;
  header?: string;
  placeholder?: string;
}

const ArtistSearchModal = ({
  isOpen,
  onRequestClose,
  isLoading,
  header,
  placeholder,
}: ArtistSearchModalProps) => {
  const [searchValue, setSearchValue] = useState("");

  const { searchArtists } = useArtistStore();

  const handleSearch = async () => {
    const res = await searchArtists(searchValue);
    console.log(res);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <HeaderWrapper>
          <Header>{header}</Header>
          <CloseButton onClick={onRequestClose} />
        </HeaderWrapper>

        <Gap height={42} />
        <SearchWrapper>
          <SearchInput
            placeholder={placeholder || "검색"}
            size="small"
            isLoading={isLoading}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClickSearch={handleSearch}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <AddNewArtist />
        </SearchWrapper>
        {/* <Gap height={32} />
        {isLoading ? (
          <LoadingContainer>
            <ClipLoader color={theme.colors.purple[600]} size={30} />
          </LoadingContainer>
        ) : (
          <ButtonContainer>
            <ButtonOutlinedSecondary label="취소" onClick={onRequestClose} />
            <ButtonFilledPrimary label="확인" onClick={onConfirm} />
          </ButtonContainer>
        )} */}
      </Container>
    </Modal>
  );
};

export default ArtistSearchModal;
