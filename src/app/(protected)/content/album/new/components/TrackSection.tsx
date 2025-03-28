import {
  Control,
  Controller,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import Album from "@/types/album";
import BulkApply from "./fragment/BulkApply";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import Track from "@/types/track";
import styled from "styled-components";
import { useEffect } from "react";
import { useTrackStore } from "@/stores/use-track-store";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface TrackSectionProps {
  albumWatch: UseFormWatch<Album>;
  trackForm: UseFormReturn<Track>;
}

export default function TrackSection({
  albumWatch,
  trackForm,
}: TrackSectionProps) {
  const { register, watch, setValue } = trackForm;
  const {} = useTrackStore();

  return (
    <Container>
      <Gap height={32} />
      <BulkApply albumWatch={albumWatch} setValue={setValue} watch={watch} />
      <Gap height={32} />
    </Container>
  );
}
