import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import Album from "@/types/album";
import CustomTextArea from "@/components/basic/CustomTextArea";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Notice = styled.div`
  ${theme.fonts.label2.regular}
  color: ${theme.colors.gray[500]};
`;

export default function RequestDetails({
  control,
  watch,
  register,
  setValue,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
  setValue: UseFormSetValue<Album>;
}) {
  const t = useTranslations("content");
  return (
    <Container>
      <CustomTextArea
        label={t("requestDetails")}
        placeholder={t("requestDetailsPlaceholder")}
        expand={true}
        {...register("requestDetails", { required: true })}
      />
      <Notice>
        {t("requestDetailsNotice")}
      </Notice>
    </Container>
  );
}
