import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export type SettlementTaxInvoiceDateType = "settlement" | "sales";

export default function SettlementTaxInvoiceDateTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: SettlementTaxInvoiceDateType;
  setSelectedType: (type: SettlementTaxInvoiceDateType) => void;
}) {
  const items = [
    {
      key: "settlement",
      value: "정산월",
    },
    {
      key: "sales",
      value: "판매월",
    },
  ];
  return (
    <Container>
      <CustomDropdown
        items={items}
        selectedKey={selectedType}
        onSelectKey={(key) =>
          setSelectedType(key as SettlementTaxInvoiceDateType)
        }
      />
    </Container>
  );
}
