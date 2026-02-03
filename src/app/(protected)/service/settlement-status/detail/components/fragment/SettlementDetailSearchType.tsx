import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

export type SettlementDetailSearchType =
  | "artistList.name"
  | "albumTitle"
  | "trackTitle"
  | "serviceName"
  | "agencyCompanyName"
  | "userInfo.displayName"
  | "userDisplayName,agencyCompanyName"
  | "all";

export default function SettlementDetailSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: SettlementDetailSearchType;
  setSelectedType: (type: SettlementDetailSearchType) => void;
}) {
  const tCommon = useTranslations("common");
  const t = useTranslations("settlement");
  const items = [
    {
      key: "all",
      value: tCommon("all"),
    },
    {
      key: "albumTitle",
      value: t("albumName"),
    },
    {
      key: "trackTitle",
      value: t("trackName"),
    },
    {
      key: "artistList.name",
      value: t("artistName"),
    },
    {
      key: "userDisplayName,agencyCompanyName",
      value: t("licensorName"),
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) =>
          setSelectedType(key as SettlementDetailSearchType)
        }
      />
    </Container>
  );
}
