import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type SettlementTaxInvoiceSearchType =
  | "domestic"
  | "international"
  | "all";

export default function SettlementTaxInvoiceSearchTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: SettlementTaxInvoiceSearchType;
  setSelectedType: (type: SettlementTaxInvoiceSearchType) => void;
}) {
  const items = [
    {
      key: "all",
      value: "전체",
    },
    {
      key: "domestic",
      value: "국내",
    },
    {
      key: "international",
      value: "해외",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) =>
          setSelectedType(key as SettlementTaxInvoiceSearchType)
        }
      />
    </Container>
  );
}
