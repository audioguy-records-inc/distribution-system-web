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

export default function TrackGenre({
  mainGenre,
  subGenre,
  onChangeMainGenre,
  onChangeSubGenre,
  readOnly = false,
}: {
  mainGenre: string;
  subGenre: string;
  onChangeMainGenre: (value: string) => void;
  onChangeSubGenre: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <Container>
      <CustomDropdown
        label="트랙 장르"
        items={getAlbumGenreMainGenreList().map((item) => ({
          key: item,
          value: item,
        }))}
        placeholder="장르 선택"
        selectedKey={mainGenre}
        onSelectKey={(selectedKey) => {
          onChangeMainGenre(selectedKey);
        }}
        size="small"
        width={156}
        readOnly={readOnly}
      />
      <CustomDropdown
        items={getAlbumGenreSubGenreList(mainGenre || "").map((item) => ({
          key: item,
          value: item,
        }))}
        placeholder="장르 선택"
        selectedKey={subGenre}
        onSelectKey={(selectedKey) => {
          onChangeSubGenre(selectedKey);
        }}
        size="small"
        width={300}
        readOnly={readOnly}
      />
    </Container>
  );
}
