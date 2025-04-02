import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import CustomUpload from "@/components/basic/CustomUpload";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import Video from "@/types/video";
import styled from "styled-components";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface UploadSectionProps {
  control: Control<Video>;
  watch: UseFormWatch<Video>;
  register: UseFormRegister<Video>;
  setValue: UseFormSetValue<Video>;
}

export default function UploadSection({
  control,
  watch,
  register,
  setValue,
}: UploadSectionProps) {
  return (
    <Container>
      <Gap height={32} />

      <CustomUpload
        onChange={(files) => {
          setValue("videoFileList", files);
        }}
        value={watch("videoFileList") || []}
        fileType={FileType.VIDEOS}
        dataCollectionName={DataCollectionName.VIDEOS}
        headerText="뮤직 비디오"
      />
      <Gap height={56} />
      <ImageUpload
        onChange={(files) => {
          setValue("thumbnailImageList", files);
        }}
        value={watch("thumbnailImageList") || []}
        fileType={FileType.IMAGES}
        dataCollectionName={DataCollectionName.VIDEOS}
        headerText="썸네일 이미지"
      />
    </Container>
  );
}
