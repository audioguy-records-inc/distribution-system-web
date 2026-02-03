import { Control, Controller, UseFormWatch } from "react-hook-form";
import {
  getAlbumGenreMainGenreList,
  getAlbumGenreSubGenreList,
} from "@/constants/album-genre";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export default function AlbumGenre({
  control,
  watch,
}: {
  control: Control<Album>;
  watch: UseFormWatch<Album>;
}) {
  const t = useTranslations("content");
  return (
    <Container>
      <Controller
        name="mainGenre"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <CustomDropdown
              label={t("albumGenre")}
              items={getAlbumGenreMainGenreList().map((item) => ({
                key: item,
                value: item,
              }))}
              placeholder={t("genreSelect")}
              selectedKey={field.value}
              onSelectKey={(selectedKey) => {
                field.onChange(selectedKey);
              }}
              size="small"
              width={156}
              required
            />
          );
        }}
      />
      <Controller
        name="subGenre"
        control={control}
        render={({ field }) => {
          return (
            <CustomDropdown
              label={t("subGenre")}
              items={getAlbumGenreSubGenreList(watch("mainGenre") || "").map(
                (item) => ({
                  key: item,
                  value: item,
                }),
              )}
              placeholder={t("genreSelect")}
              selectedKey={field.value}
              onSelectKey={(selectedKey) => {
                field.onChange(selectedKey);
              }}
              size="small"
              width={300}
            />
          );
        }}
      />
    </Container>
  );
}
