import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { DataCollectionName, FileType } from "@/types/upload";

import Album from "@/types/album";
import Gap from "@/components/basic/Gap";
import ImageUpload from "@/components/basic/ImageUpload";
import ParticipateArtistSearch from "./fragment/ParticipateArtistSearch";
import ReleaseArtistSearch from "./fragment/ReleaseArtistSearch";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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
  const ta = useTranslations("artist");
  const t = useTranslations("content");
  return (
    <Container>
      <Gap height={32} />
      <Controller
        name="releaseArtistList"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ReleaseArtistSearch
            value={field.value || []}
            onChange={field.onChange}
            readOnly={false}
            placeholder={ta("artistSearch")}
            label={t("albumArtist")}
            modalHeader={t("albumArtistSearch")}
            required={true}
          />
        )}
      />
      <Gap height={56} />
      <Controller
        name="participateArtistList"
        control={control}
        render={({ field }) => (
          <ParticipateArtistSearch
            value={field.value || []}
            onChange={field.onChange}
            readOnly={false}
            placeholder={ta("artistSearch")}
            label={t("participateArtist")}
            modalHeader={t("participateArtistSearch")}
          />
        )}
      />
    </Container>
  );
}
