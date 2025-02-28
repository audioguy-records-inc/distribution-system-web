import CheckIcon from "../icons/CheckIcon";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "normal" | "small";
}

const CheckboxContainer = styled.label<{
  $disabled?: boolean;
  $size?: "normal" | "small";
}>`
  display: flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  gap: ${({ $size }) => ($size === "small" ? "6px" : "8px")};
`;

const CheckboxInput = styled.div<{
  $checked: boolean;
  $disabled?: boolean;
  $size?: "normal" | "small";
}>`
  width: ${({ $size }) => ($size === "small" ? "16px" : "20px")};
  height: ${({ $size }) => ($size === "small" ? "16px" : "20px")};
  margin: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $checked, $disabled }) =>
    $disabled
      ? $checked
        ? theme.colors.purple[100]
        : theme.colors.gray[50]
      : $checked
      ? theme.colors.purple[600]
      : theme.colors.gray[50]};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $checked, $disabled }) =>
      $disabled
        ? $checked
          ? theme.colors.purple[100]
          : theme.colors.gray[50]
        : $checked
        ? theme.colors.purple[700]
        : theme.colors.gray[100]};
  }
`;

const Label = styled.span<{ $disabled?: boolean; $size?: "normal" | "small" }>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.label2.medium : theme.fonts.body2.medium}
  color: ${({ $disabled }) => ($disabled ? theme.colors.gray[100] : "black")};
`;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "normal",
}) => {
  return (
    <CheckboxContainer
      $disabled={disabled}
      $size={size}
      onClick={() => !disabled && onChange(!checked)}
    >
      <CheckboxInput $checked={checked} $disabled={disabled} $size={size}>
        <CheckIcon
          width={size === "small" ? 14 : 16}
          height={size === "small" ? 14 : 16}
          color="white"
        />
      </CheckboxInput>
      <Label $disabled={disabled} $size={size}>
        {label}
      </Label>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
