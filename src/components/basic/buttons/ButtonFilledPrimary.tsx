import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface ButtonFilledPrimaryProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}

const ButtonWrapper = styled.button<{
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}>`
  padding: ${(props) => {
    switch (props.size) {
      case "medium":
        return "9px 20px";
      case "small":
        return "7px 14px";
      default:
        return "12px 28px";
    }
  }};
  border: none;
  border-radius: ${(props) => {
    switch (props.size) {
      case "medium":
        return "8px";
      case "small":
        return "6px";
      default:
        return "10px";
    }
  }};
  background-color: ${(props) =>
    props.disabled ? theme.colors.gray[50] : theme.colors.purple[600]};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.size === "large" ? "6px" : "4px")};
  width: fit-content;
  height: fit-content;
  color: ${(props) =>
    props.disabled ? theme.colors.gray[100] : theme.colors.white};
  ${theme.fonts.body1.semibold}

  &:hover {
    background-color: ${(props) =>
      props.disabled ? theme.colors.gray[50] : theme.colors.purple[700]};
  }

  &:active {
    background-color: ${(props) =>
      props.disabled ? theme.colors.gray[50] : theme.colors.purple[800]};
  }
`;

const IconWrapper = styled.span<{
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.disabled ? theme.colors.gray[100] : theme.colors.white};
  /* background-color: yellow; */
  svg {
    width: ${(props) => {
      switch (props.size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "20px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "20px";
      }
    }};
    stroke: ${(props) =>
      props.disabled ? theme.colors.gray[100] : theme.colors.white};
    path {
      stroke: ${(props) =>
        props.disabled ? theme.colors.gray[100] : theme.colors.white};
    }
  }
`;

const LabelWrapper = styled.span<{ size?: "large" | "medium" | "small" }>`
  ${(props) => {
    switch (props.size) {
      case "medium":
        return theme.fonts.body2.semibold;
      case "small":
        return theme.fonts.label2.semibold;
      default:
        return theme.fonts.body1.semibold;
    }
  }}
`;

const ButtonFilledPrimary: React.FC<ButtonFilledPrimaryProps> = ({
  leftIcon,
  rightIcon,
  label,
  onClick,
  disabled = false,
  size = "large",
}) => {
  return (
    <ButtonWrapper
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      size={size}
    >
      {leftIcon && (
        <IconWrapper disabled={disabled} size={size}>
          {leftIcon}
        </IconWrapper>
      )}
      <LabelWrapper size={size}>{label}</LabelWrapper>
      {rightIcon && (
        <IconWrapper disabled={disabled} size={size}>
          {rightIcon}
        </IconWrapper>
      )}
    </ButtonWrapper>
  );
};

export default ButtonFilledPrimary;
