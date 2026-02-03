import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Container = styled.div``;

export default function SettlementDetailDateTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: "settlement" | "sales";
  setSelectedType: (type: "settlement" | "sales") => void;
}) {
  const t = useTranslations("settlement");
  const items = [
    {
      key: "settlement",
      value: t("settlementMonth"),
    },
    {
      key: "sales",
      value: t("salesMonth"),
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) => setSelectedType(key as "settlement" | "sales")}
      />
    </Container>
  );
}
