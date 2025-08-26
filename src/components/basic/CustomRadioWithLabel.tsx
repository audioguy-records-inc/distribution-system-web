import React, { useEffect } from "react";

import CustomRadio from "./CustomRadio";
import styled from "styled-components";
import theme from "@/styles/theme";

interface CustomRadioWithLabelProps {
  label: string;
  leftOption: {
    label: string;
    value?: string | boolean;
    checked: boolean;
  };
  rightOption: {
    label: string;
    value?: string | boolean;
    checked: boolean;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void;
  disabled?: boolean;
  value?: string | boolean;
  readOnly?: boolean;
  required?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 320px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${theme.fonts.body2.medium}
  color: ${theme.colors.gray[600]};
`;

const Required = styled.span`
  ${theme.fonts.body2.medium}
  color: ${theme.colors.red[600]};
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 42px;
`;

const CustomRadioWithLabel = ({
  label,
  leftOption,
  rightOption,
  onChange,
  disabled = false,
  value,
  readOnly = false,
  required = false,
}: CustomRadioWithLabelProps) => {
  const leftValue =
    leftOption.value !== undefined ? leftOption.value : "domestic";
  const rightValue =
    rightOption.value !== undefined ? rightOption.value : "international";

  const handleChange = (isLeft: boolean) => {
    if (readOnly || disabled) return;

    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: isLeft ? leftValue : rightValue,
        },
        type: "change",
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <Container>
      <Label>
        {label}
        {required && <Required>*</Required>}
      </Label>
      <RadioContainer>
        <CustomRadio
          checked={value === leftValue}
          onChange={() => handleChange(true)}
          label={leftOption.label}
          disabled={disabled}
          readOnly={readOnly}
        />
        <CustomRadio
          checked={value === rightValue}
          onChange={() => handleChange(false)}
          label={rightOption.label}
          disabled={disabled}
          readOnly={readOnly}
        />
      </RadioContainer>
    </Container>
  );
};

export default CustomRadioWithLabel;
