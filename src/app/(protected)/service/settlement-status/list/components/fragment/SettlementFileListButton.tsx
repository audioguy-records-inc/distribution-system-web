import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import ListIcon from "@/components/icons/ListIcon";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

interface SettlementFileListButtonProps {
  onClick: () => void;
}

export default function SettlementFileListButton({
  onClick,
}: SettlementFileListButtonProps) {
  const t = useTranslations("settlement");
  return (
    <Container>
      <ButtonOutlinedPrimary
        label={t("uploadedFileList")}
        leftIcon={<ListIcon />}
        onClick={onClick}
        size="medium"
      />
    </Container>
  );
}
