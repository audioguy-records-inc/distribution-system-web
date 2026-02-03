import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useAnnouncementStore } from "@/stores/use-announcement-store";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
`;

export type AnnouncementSearchType =
  | "ETC"
  | "TRANSMISSION"
  | "SETTLEMENT"
  | "ALL";

export default function AnnouncementSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: AnnouncementSearchType;
  setSelectedType: (type: AnnouncementSearchType) => void;
}) {
  const t = useTranslations("announcement");
  const { searchAnnouncements } = useAnnouncementStore();
  const items = [
    {
      key: "ALL",
      value: t("recipientAll"),
    },
    {
      key: "TRANSMISSION",
      value: t("typeTransmission"),
    },
    {
      key: "SETTLEMENT",
      value: t("typeSettlement"),
    },
    {
      key: "ETC",
      value: t("typeEtc"),
    },
  ];
  const handleSearch = async (key: AnnouncementSearchType) => {
    const _type = key === "ALL" ? null : key;
    if (_type) {
      await searchAnnouncements({
        type: _type,
        __searchKeyword: "",
      });
    } else {
      await searchAnnouncements({
        __searchKeyword: "",
      });
    }
  };

  return (
    <Container>
      <CustomDropdown
        label={t("type")}
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => {
          const _key = key as AnnouncementSearchType;
          setSelectedType(_key);
          handleSearch(_key);
        }}
      />
    </Container>
  );
}
