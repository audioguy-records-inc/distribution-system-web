import CheckIcon from "../icons/CheckIcon";
import React from "react";
import styled from "styled-components";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

const CheckboxInput = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }) => (checked ? "#8B5CF6" : "#D1D5DB")};
  transition: background-color 0.2s;
`;

const Label = styled.span`
  font-size: 16px;
  color: black;
`;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <CheckboxContainer onClick={() => onChange(!checked)}>
      <CheckboxInput checked={checked}>
        <CheckIcon width={14} height={14} color="white" />
      </CheckboxInput>
      <Label>{label}</Label>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
