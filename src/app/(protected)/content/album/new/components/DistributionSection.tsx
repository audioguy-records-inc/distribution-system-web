import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import Album from "@/types/album";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface DistributionSectionProps {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
}

export default function DistributionSection({
  control,
  watch,
  register,
}: DistributionSectionProps) {
  const t = useTranslations("content");
  return (
    <Container>
      <Gap height={32} />
      <RowWrapper>
        <CustomInput label="UCI" placeholder={t("uciPlaceholder")} {...register("UCI")} />
        <CustomInput
          label="UPC"
          placeholder={t("upcPlaceholder")}
          required
          blueRequired
          {...register("UPC")}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <Controller
          name="artistImageList"
          control={control}
          render={({ field }) => (
            <ImageUpload
              headerText={t("artistImage")}
              onChange={field.onChange}
              value={field.value || []}
              fileType={FileType.IMAGES}
              dataCollectionName={DataCollectionName.ALBUMS}
              width="320px"
            />
          )}
        />
      </RowWrapper>
    </Container>
  );
}
