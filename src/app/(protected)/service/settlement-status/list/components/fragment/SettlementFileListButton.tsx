import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import ListIcon from "@/components/icons/ListIcon";
import styled from "styled-components";

const Container = styled.div``;

interface SettlementFileListButtonProps {
  onClick: () => void;
}

export default function SettlementFileListButton({
  onClick,
}: SettlementFileListButtonProps) {
  return (
    <Container>
      <ButtonOutlinedPrimary
        label="업로드한 파일 리스트"
        leftIcon={<ListIcon />}
        onClick={onClick}
        size="medium"
      />
    </Container>
  );
}
