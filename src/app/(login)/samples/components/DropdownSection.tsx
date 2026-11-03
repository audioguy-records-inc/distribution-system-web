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
  flex-wrap: wrap;
`;

export default function DropdownSection() {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const items = [
    { key: "1", value: "Item 1" },
    { key: "2", value: "Item 2" },
    { key: "3", value: "Item 3" },
  ];

  return (
    <Container>
      <DropdownWrapper>
        <CustomDropdown label="Label" required items={items} />
        <CustomDropdown
          label="Label"
          required
          selectedKey={selectedItem}
          items={items}
          onSelectKey={setSelectedItem}
        />
        <CustomDropdown label="Label" disabled items={items} />
        <CustomDropdown label="Label" required disabled items={items} />
        <CustomDropdown
          label="Label"
          required
          multiple
          items={items}
          onMultiSelectKeys={setSelectedItems}
          selectedKeys={selectedItems}
        />
      </DropdownWrapper>
      <DropdownWrapper>
        <CustomDropdown label="Label" required items={items} size="small" />
        <CustomDropdown
          label="Label"
          required
          selectedKey={selectedItem}
          items={items}
          onSelectKey={setSelectedItem}
          size="small"
        />
        <CustomDropdown label="Label" disabled items={items} size="small" />
        <CustomDropdown
          label="Label"
          required
          disabled
          items={items}
          size="small"
        />
        <CustomDropdown
          label="Label"
          required
          multiple
          items={items}
          onMultiSelectKeys={setSelectedItems}
          selectedKeys={selectedItems}
          size="small"
        />
      </DropdownWrapper>
    </Container>
  );
}
