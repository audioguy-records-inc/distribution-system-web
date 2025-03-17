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
  onChange?: (event: any) => void;
  disabled?: boolean;
  value?: string | boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.div`
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[600]};
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const CustomRadioWithLabel = ({
  label,
  leftOption,
  rightOption,
  onChange,
  disabled = false,
  value,
}: CustomRadioWithLabelProps & { [key: string]: any }) => {
  const leftValue =
    leftOption.value !== undefined ? leftOption.value : "domestic";
  const rightValue =
    rightOption.value !== undefined ? rightOption.value : "international";

  const handleChange = (isLeft: boolean) => {
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
      <Label>{label}</Label>
      <RadioContainer>
        <CustomRadio
          checked={value === leftValue}
          onChange={() => handleChange(true)}
          label={leftOption.label}
          disabled={disabled}
        />
        <CustomRadio
          checked={value === rightValue}
          onChange={() => handleChange(false)}
          label={rightOption.label}
          disabled={disabled}
        />
      </RadioContainer>
    </Container>
  );
};

export default CustomRadioWithLabel;
