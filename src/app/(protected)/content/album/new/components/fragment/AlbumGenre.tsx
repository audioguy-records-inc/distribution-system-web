import { Control, Controller, UseFormWatch } from "react-hook-form";
import {
  getAlbumGenreMainGenreList,
  getAlbumGenreSubGenreList,
} from "@/constants/album-genre";

import Album from "@/types/album";
import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

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
  return (
    <Container>
      <Controller
        name="mainGenre"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <CustomDropdown
              label="앨범 장르"
              items={getAlbumGenreMainGenreList().map((item) => ({
                key: item,
                value: item,
              }))}
              placeholder="장르 선택"
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
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <CustomDropdown
              label="서브 장르"
              items={getAlbumGenreSubGenreList(watch("mainGenre") || "").map(
                (item) => ({
                  key: item,
                  value: item,
                }),
              )}
              placeholder="장르 선택"
              selectedKey={field.value}
              onSelectKey={(selectedKey) => {
                field.onChange(selectedKey);
              }}
              size="small"
              width={300}
              required
            />
          );
        }}
      />
    </Container>
  );
}
