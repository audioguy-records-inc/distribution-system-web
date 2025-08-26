import CustomDropdown from "@/components/basic/CustomDropdown";
import { albumTypeList } from "@/constants/album-type";
import styled from "styled-components";

const Container = styled.div``;

export default function AlbumType({
  value,
  onChange,
  readOnly,
}: {
  value: string;
  onChange: (value: string) => void;
  readOnly: boolean;
}) {
  return (
    <Container>
      <CustomDropdown
        label={"앨범 유형"}
        items={albumTypeList}
        placeholder="앨범 타입 선택"
        selectedKey={value}
        onSelectKey={(selectedKey) => {
          onChange(selectedKey);
        }}
        size="small"
        width={320}
        required
      />
    </Container>
  );
}
