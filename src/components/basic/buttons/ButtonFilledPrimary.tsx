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
  expand?: boolean;
}

const ButtonWrapper = styled.button<{
  $disabled?: boolean;
  $size?: "large" | "medium" | "small";
  $expand?: boolean;
  $arrow?: boolean;
}>`
  padding: ${(props) => {
    if (props.$arrow) return "8px 8px 8px 22px";
    switch (props.$size) {
      case "medium":
        return "8px 18px";
      case "small":
        return "6px 14px";
      default:
        return "12px 24px";
    }
  }};
  border: 1px solid ${(props) => (props.$disabled ? "#eaeaea" : "#3a3a3a")};
  border-radius: 999px;
  background-color: ${(props) => (props.$disabled ? "#f6f6f6" : "#0a0a0a")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$size === "large" ? "10px" : "4px")};
  width: ${(props) => (props.$expand ? "100%" : "fit-content")};
  height: fit-content;
  color: ${(props) => (props.$disabled ? "#cacaca" : "#fafafa")};
  ${theme.fonts.body1.medium}
  font-weight: 500;
  transition: background-color 180ms ease, border-color 180ms ease;

  &:hover {
    background-color: ${(props) => (props.$disabled ? "#f6f6f6" : "#1a1a1a")};
  }

  &:active {
    background-color: ${(props) => (props.$disabled ? "#f6f6f6" : "#2a2a2a")};
  }
`;

const IconWrapper = styled.span<{
  $disabled?: boolean;
  $size?: "large" | "medium" | "small";
}>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.$disabled ? theme.colors.gray[100] : theme.colors.white};
  /* background-color: yellow; */
  svg {
    width: ${(props) => {
      switch (props.$size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "20px";
      }
    }};
    height: ${(props) => {
      switch (props.$size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "20px";
      }
    }};
    stroke: ${(props) =>
      props.$disabled ? theme.colors.gray[100] : theme.colors.white};
    path {
      stroke: ${(props) =>
        props.$disabled ? theme.colors.gray[100] : theme.colors.white};
    }
  }
`;

const ArrowCircle = styled.span<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(props) => (props.$disabled ? "#cacaca" : "#fafafa")};
  color: #0a0a0a;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const LabelWrapper = styled.span<{ $size?: "large" | "medium" | "small" }>`
  ${(props) => {
    switch (props.$size) {
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
  expand = false,
}) => {
  const showArrow = size === "large" && !rightIcon && !leftIcon;
  return (
    <ButtonWrapper
      onClick={disabled ? undefined : onClick}
      $disabled={disabled}
      $size={size}
      $expand={expand}
      $arrow={showArrow}
    >
      {leftIcon && (
        <IconWrapper $disabled={disabled} $size={size}>
          {leftIcon}
        </IconWrapper>
      )}
      <LabelWrapper $size={size}>{label}</LabelWrapper>
      {rightIcon && (
        <IconWrapper $disabled={disabled} $size={size}>
          {rightIcon}
        </IconWrapper>
      )}
      {showArrow && (
        <ArrowCircle $disabled={disabled} aria-hidden>
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 7h8M8 3.5 11.5 7 8 10.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ArrowCircle>
      )}
    </ButtonWrapper>
  );
};

export default ButtonFilledPrimary;
