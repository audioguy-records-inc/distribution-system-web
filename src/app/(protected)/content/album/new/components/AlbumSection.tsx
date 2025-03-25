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

interface AlbumSectionProps {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
}

export default function AlbumSection({
  control,
  watch,
  register,
}: AlbumSectionProps) {
  return (
    <Container>
      <Gap height={32} />
    </Container>
  );
}
