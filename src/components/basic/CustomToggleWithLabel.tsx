import CustomToggle from "./CustomToggle";
import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface CustomToggleWithLabelProps {
  label: string;
  leftOption: {
    label: string;
    checked: boolean;
  };
  rightOption: {
    label: string;
    checked: boolean;
  };
  onChange?: (isLeftChecked: boolean) => void;
  disabled?: boolean;
  value?: boolean;
  name?: string;
  onBlur?: () => void;
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

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const CustomToggleWithLabel = React.forwardRef<
  HTMLDivElement,
  CustomToggleWithLabelProps
>(
  (
    {
      label,
      leftOption,
      rightOption,
      onChange,
      disabled = false,
      value,
      name,
      onBlur,
    },
    ref,
  ) => {
    const handleLeftToggle = (checked: boolean) => {
      if (checked) {
        onChange?.(true);
      }
    };

    const handleRightToggle = (checked: boolean) => {
      if (checked) {
        onChange?.(false);
      }
    };

    // React Hook Form에서 전달된 value 사용
    const isLeftChecked = value === undefined ? leftOption.checked : value;
    const isRightChecked = value === undefined ? rightOption.checked : !value;

    return (
      <Container>
        <Label>{label}</Label>
        <ToggleContainer>
          <CustomToggle
            checked={isLeftChecked}
            onChange={handleLeftToggle}
            label={leftOption.label}
            disabled={disabled}
          />
          <CustomToggle
            checked={isRightChecked}
            onChange={handleRightToggle}
            label={rightOption.label}
            disabled={disabled}
          />
        </ToggleContainer>
      </Container>
    );
  },
);

CustomToggleWithLabel.displayName = "CustomToggleWithLabel";

export default CustomToggleWithLabel;
