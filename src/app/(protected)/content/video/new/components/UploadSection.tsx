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
import { useTranslations } from "next-intl";

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
  const tv = useTranslations("video");
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
        headerText={tv("musicVideo")}
      />
      <Gap height={56} />
      <ImageUpload
        onChange={(files) => {
          setValue("thumbnailImageList", files);
        }}
        value={watch("thumbnailImageList") || []}
        fileType={FileType.IMAGES}
        dataCollectionName={DataCollectionName.VIDEOS}
        headerText={tv("thumbnailImage")}
      />
    </Container>
  );
}
