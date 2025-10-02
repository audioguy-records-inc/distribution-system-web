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
  return (
    <Container>
      <Gap height={32} />
      <RowWrapper>
        <CustomInput label="UCI" placeholder="UCI 입력" {...register("UCI")} />
        <CustomInput
          label="UPC"
          placeholder="UPC 입력"
          required
          {...register("UPC")}
        />
      </RowWrapper>
      <Gap height={56} />
      <RowWrapper>
        <CustomInput
          label="앨범 코드"
          placeholder="앨범 코드 입력"
          {...register("albumUniqueId")}
        />
        <Controller
          name="artistImageList"
          control={control}
          render={({ field }) => (
            <ImageUpload
              headerText="아티스트 이미지"
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
