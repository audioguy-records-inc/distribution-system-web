import { useEffect, useRef, useState } from "react";

import ArrowDownIcon from "../icons/ArrowDownIcon";
import CheckIcon from "../icons/CheckIcon";
import CustomChip from "./CustomChip";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div<{ $hasLabel?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $hasLabel }) => ($hasLabel ? "8px" : "0")};
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.label<{ $disabled?: boolean; $size?: "small" | "normal" }>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.gray[300] : theme.colors.gray[600]};
`;

const Required = styled.span<{
  $disabled?: boolean;
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.red[300] : theme.colors.red[600]};
`;

const DropdownContainer = styled.button<{
  $selected?: boolean;
  $disabled?: boolean;
  $size?: "small" | "normal";
  $width?: number;
}>`
  display: flex;
  height: ${({ $size }) => ($size === "small" ? "42px" : "48px")};
  width: ${({ $width }) => $width}px;
  padding: 4px 8px 4px ${({ $size }) => ($size === "small" ? "12px" : "14px")};
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid
    ${({ $disabled }) =>
      $disabled ? theme.colors.gray[25] : theme.colors.gray[50]};
  background: ${theme.colors.white};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.gray[100]};
  }

  &:active:not(:disabled) {
    border-color: ${theme.colors.purple[600]};
  }
`;

const Content = styled.span<{
  $selected?: boolean;
  $disabled?: boolean;
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${({ $selected, $disabled }) =>
    $disabled
      ? theme.colors.gray[100]
      : $selected
      ? theme.colors.gray[800]
      : theme.colors.gray[300]};
  flex: 1;
`;

const IconContainer = styled.div<{ $size?: "small" | "normal" }>`
  display: flex;
  width: ${({ $size }) => ($size === "small" ? "32px" : "40px")};
  height: ${({ $size }) => ($size === "small" ? "32px" : "40px")};
  padding: 8px;
  justify-content: center;
  align-items: center;

  svg {
    width: ${({ $size }) => ($size === "small" ? "18px" : "24px")};
    height: ${({ $size }) => ($size === "small" ? "18px" : "24px")};
  }
`;

const ListContainer = styled.div`
  position: relative;
  width: 100%;
`;

const List = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  background: ${theme.colors.white};
  z-index: 1;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[50]};
  overflow: hidden;
`;

const CheckboxContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 4px;
  background-color: ${({ $selected }) =>
    $selected ? theme.colors.purple[600] : theme.colors.gray[50]};
  margin-right: 8px;
`;

const ListItem = styled.li`
  padding: 12px 14px;
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 0;
    height: 1px;
    background-color: ${theme.colors.gray[50]};
  }

  &:hover {
    background: ${theme.colors.gray[25]};
  }
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

interface CustomDropdownProps<T> {
  label?: string;
  required?: boolean;
  selectedItem?: T;
  selectedItems?: T[];
  content: string;
  width?: number;
  disabled?: boolean;
  size?: "small" | "normal";
  onSelect?: (item: T) => void;
  onMultiSelect?: (items: T[]) => void;
  items: { content: string; value: T }[];
  multiple?: boolean;
}

const CustomDropdown = <T,>({
  label,
  required,
  selectedItem,
  selectedItems = [],
  content,
  width = 180,
  disabled,
  size = "normal",
  onSelect,
  onMultiSelect,
  items,
  multiple = false,
}: CustomDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: { content: string; value: T }) => {
    if (multiple) {
      const newSelectedItems = selectedItems.includes(item.value)
        ? selectedItems.filter((i) => i !== item.value)
        : [...selectedItems, item.value];
      onMultiSelect?.(newSelectedItems);
    } else {
      onSelect?.(item.value);
      setIsOpen(false);
    }
  };

  const handleChipDelete = (value: T) => {
    const newSelectedItems = selectedItems.filter((item) => item !== value);
    onMultiSelect?.(newSelectedItems);
  };

  return (
    <Container $hasLabel={!!label}>
      <LabelContainer>
        {label && (
          <Label $disabled={disabled} $size={size}>
            {label}
          </Label>
        )}
        {required && (
          <Required $disabled={disabled} $size={size}>
            *
          </Required>
        )}
      </LabelContainer>
      <ListContainer ref={dropdownRef}>
        <DropdownContainer
          $selected={!!selectedItem}
          $disabled={disabled}
          $size={size}
          $width={width}
          onClick={handleClick}
          disabled={disabled}
        >
          <Content $selected={!!selectedItem} $disabled={disabled} $size={size}>
            {content}
          </Content>
          <IconContainer $size={size}>
            <ArrowDownIcon
              color={disabled ? theme.colors.gray[300] : theme.colors.gray[500]}
            />
          </IconContainer>
        </DropdownContainer>

        {isOpen && !disabled && (
          <List>
            {items.map((item, index) => (
              <ListItem key={index} onClick={() => handleSelect(item)}>
                {multiple && (
                  <CheckboxContainer
                    $selected={selectedItems.includes(item.value)}
                  >
                    <CheckIcon color={"white"} width={16} height={16} />
                  </CheckboxContainer>
                )}
                {item.content}
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>

      {multiple && selectedItems.length > 0 && (
        <ChipsContainer>
          {items
            .filter((item) => selectedItems.includes(item.value))
            .map((item, index) => (
              <CustomChip
                key={index}
                label={item.content}
                deletable
                onClick={() => handleChipDelete(item.value)}
              />
            ))}
        </ChipsContainer>
      )}
    </Container>
  );
};

export default CustomDropdown;
