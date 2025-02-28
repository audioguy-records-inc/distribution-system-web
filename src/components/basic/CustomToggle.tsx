import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface CustomToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const ToggleContainer = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  gap: 8px;
`;

const Label = styled.span<{ $disabled?: boolean }>`
  ${theme.fonts.body2.medium}
  color: ${({ $disabled }) => ($disabled ? theme.colors.gray[100] : "black")};
`;

const ToggleInput = styled.div<{ $checked: boolean; $disabled?: boolean }>`
  width: 39px;
  height: 24px;
  border-radius: 12px;
  position: relative;
  background-color: ${({ $checked, $disabled }) =>
    $disabled
      ? $checked
        ? theme.colors.purple[100]
        : theme.colors.gray[50]
      : $checked
      ? theme.colors.purple[600]
      : theme.colors.gray[100]};
  transition: background-color 0.2s;
`;

const ToggleButton = styled.div<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 3px;
  left: ${({ $checked }) => ($checked ? "18px" : "3px")};
  transition: left 0.2s;
`;

const CustomToggle: React.FC<CustomToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <ToggleContainer
      $disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
    >
      <Label $disabled={disabled}>{label}</Label>
      <ToggleInput $checked={checked} $disabled={disabled}>
        <ToggleButton $checked={checked} />
      </ToggleInput>
    </ToggleContainer>
  );
};

export default CustomToggle;
