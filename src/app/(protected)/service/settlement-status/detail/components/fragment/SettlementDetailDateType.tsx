import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";

const Container = styled.div``;

export default function SettlementDetailDateTypeDropdown({
  selectedType,
  setSelectedType,
}: {
  selectedType: "settlement" | "sales";
  setSelectedType: (type: "settlement" | "sales") => void;
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
        onSelectKey={(key) => setSelectedType(key as "settlement" | "sales")}
      />
    </Container>
  );
}
