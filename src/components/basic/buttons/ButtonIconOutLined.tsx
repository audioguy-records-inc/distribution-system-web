import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface ButtonIconOutLinedProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}

const ButtonWrapper = styled.button<{
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}>`
  border: 1px solid ${theme.colors.gray[50]}; // border 추가
  background-color: ${theme.colors.white};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => {
    switch (props.size) {
      case "medium":
        return "32px";
      case "small":
        return "28px";
      default:
        return "40px";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "medium":
        return "32px";
      case "small":
        return "28px";
      default:
        return "40px";
    }
  }};
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

  &:hover {
    background-color: ${theme.colors.gray[25]};
  }

  &:active {
    background-color: ${theme.colors.gray[50]};
  }
`;

const IconWrapper = styled.span<{
  disabled?: boolean;
  size?: "large" | "medium" | "small";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.disabled ? theme.colors.gray[100] : theme.colors.gray[800]};

  svg {
    width: ${(props) => {
      switch (props.size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "24px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "medium":
          return "18px";
        case "small":
          return "16px";
        default:
          return "24px";
      }
    }};
    stroke: ${(props) =>
      props.disabled ? theme.colors.gray[100] : theme.colors.gray[800]};
    path {
      stroke: ${(props) =>
        props.disabled ? theme.colors.gray[100] : theme.colors.gray[800]};
    }
  }
`;

const ButtonIconOutLined: React.FC<ButtonIconOutLinedProps> = ({
  icon,
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
      <IconWrapper disabled={disabled} size={size}>
        {icon}
      </IconWrapper>
    </ButtonWrapper>
  );
};

export default ButtonIconOutLined;
