import ButtonFilledPrimary from "./basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "./basic/buttons/ButtonOutlinedSecondary";
import Gap from "./basic/Gap";
import Modal from "react-modal";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  width: 383px;
`;

const Content = styled.div`
  ${theme.fonts.heading2.medium};
  color: ${theme.colors.gray[800]};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;
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
    padding: "32px 20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  content: string;
}

const CustomModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  content,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <Content>{content}</Content>
        <Gap height={32} />
        <ButtonContainer>
          <ButtonOutlinedSecondary label="취소" onClick={onRequestClose} />
          <ButtonFilledPrimary label="확인" onClick={onConfirm} />
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

export default CustomModal;
