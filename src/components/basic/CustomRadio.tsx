import DotIcon from "../icons/DotIcon";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface CustomRadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  size?: "normal" | "small";
  readOnly?: boolean;
}

const RadioContainer = styled.label<{
  $disabled?: boolean;
  $size?: "normal" | "small";
  $readOnly?: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: ${({ $disabled, $readOnly }) =>
    $disabled || $readOnly ? "default" : "pointer"};
  gap: ${({ $size }) => ($size === "small" ? "6px" : "8px")};
`;

const RadioInput = styled.div<{
  $checked: boolean;
  $disabled?: boolean;
  $size?: "normal" | "small";
}>`
  width: ${({ $size }) => ($size === "small" ? "16px" : "20px")};
  height: ${({ $size }) => ($size === "small" ? "16px" : "20px")};
  margin: 2px;
  border-radius: 50%; // 체크박스와 다른 부분: 동그란 모양으로 변경
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

const CustomRadio: React.FC<CustomRadioProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "normal",
  readOnly = false,
}) => {
  return (
    <RadioContainer
      $disabled={disabled}
      $readOnly={readOnly}
      $size={size}
      onClick={() => !disabled && !readOnly && onChange(!checked)}
    >
      <RadioInput $checked={checked} $disabled={disabled} $size={size}>
        <DotIcon
          width={size === "small" ? 14 : 16}
          height={size === "small" ? 14 : 16}
          color="white"
        />
      </RadioInput>
      <Label $disabled={disabled} $size={size}>
        {label}
      </Label>
    </RadioContainer>
  );
};

export default CustomRadio;
