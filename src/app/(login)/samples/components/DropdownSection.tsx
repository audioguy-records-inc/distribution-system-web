import CustomDropdown from "@/components/basic/CustomDropdown";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function DropdownSection() {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const items = [
    { content: "Item 1", value: "1" },
    { content: "Item 2", value: "2" },
    { content: "Item 3", value: "3" },
  ];

  // content 표시를 위한 함수들
  const getSelectedContent = (value: string) => {
    return items.find((item) => item.value === value)?.content || "";
  };

  const getMultiSelectedContent = (values: string[]) => {
    return values.map((value) => getSelectedContent(value)).join(", ");
  };

  return (
    <Container>
      <DropdownWrapper>
        <CustomDropdown label="Label" content="Label" required items={items} />
        <CustomDropdown
          label="Label"
          content={getSelectedContent(selectedItem)}
          required
          selectedItem={selectedItem}
          items={items}
          onSelect={setSelectedItem}
        />
        <CustomDropdown label="Label" content="Label" disabled items={items} />
        <CustomDropdown
          label="Label"
          content="Label"
          required
          disabled
          items={items}
        />
        <CustomDropdown
          label="Label"
          content={getMultiSelectedContent(selectedItems)}
          required
          multiple
          items={items}
          onMultiSelect={setSelectedItems}
          selectedItems={selectedItems}
        />
      </DropdownWrapper>
    </Container>
  );
}
