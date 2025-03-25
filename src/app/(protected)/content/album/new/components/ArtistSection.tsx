import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import Album from "@/types/album";
import ArtistSearch from "./fragment/ArtistSearch";
import CustomInput from "@/components/basic/CustomInput";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import styled from "styled-components";

const Container = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  gap: 120px;
`;

interface ArtistSectionProps {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
  register: UseFormRegister<Album>;
}

export default function ArtistSection({
  control,
  watch,
  register,
}: ArtistSectionProps) {
  return (
    <Container>
      <Gap height={32} />
      <Controller
        name="releaseArtistList"
        control={control}
        render={({ field }) => (
          <ArtistSearch
            value={field.value}
            onChange={field.onChange}
            readOnly={false}
            placeholder="아티스트 검색"
            label="앨범 아티스트"
            modalHeader="앨범 아티스트 검색"
          />
        )}
      />
    </Container>
  );
}
