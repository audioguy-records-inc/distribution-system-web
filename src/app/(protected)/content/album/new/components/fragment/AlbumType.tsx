import CustomDropdown from "@/components/basic/CustomDropdown";
import { albumTypeList } from "@/constants/album-type";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("content");
  const translatedAlbumTypes = albumTypeList.map((item) => ({
    key: item.key,
    value: t(item.translationKey),
  }));
  return (
    <Container>
      <CustomDropdown
        label={t("albumType")}
        items={translatedAlbumTypes}
        placeholder={t("albumTypeSelect")}
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
