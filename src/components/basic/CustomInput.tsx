import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Label = styled.label<{ $disabled?: boolean; $size?: "small" | "normal" }>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.gray[300] : theme.colors.gray[600]};
`;

const Required = styled.span<{
  $disabled?: boolean;
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.red[300] : theme.colors.red[600]};
`;

const HelpText = styled.div<{ $isError?: boolean }>`
  ${theme.fonts.label2.regular}
  color: ${({ $isError }) =>
    $isError ? theme.colors.red[500] : theme.colors.gray[300]};
`;

const InputContainer = styled.div<{
  $isError?: boolean;
  $width?: number;
  $locked?: boolean;
  $disabled?: boolean;
  $size?: "small" | "normal";
}>`
  display: flex;
  height: ${({ $size }) => ($size === "small" ? "42px" : "48px")};
  width: ${({ $width }) => $width}px;
  padding: 4px 8px 4px ${({ $size }) => ($size === "small" ? "12px" : "14px")};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid
    ${({ $isError, $disabled }) =>
      $isError
        ? theme.colors.red[600]
        : $disabled
        ? theme.colors.gray[25]
        : theme.colors.gray[50]};
  background: ${({ $locked }) =>
    $locked ? theme.colors.gray[25] : theme.colors.white};

  &:focus-within {
    border-color: ${({ $isError }) =>
      $isError ? theme.colors.red[600] : theme.colors.purple[600]};
  }
`;

const Input = styled.input<{
  $disabled?: boolean;
  $locked?: boolean;
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.regular : theme.fonts.body1.regular}
  color: ${({ $locked, $disabled }) =>
    $disabled
      ? theme.colors.gray[100]
      : $locked
      ? theme.colors.gray[500]
      : theme.colors.gray[800]};
  font-feature-settings: "ss10" on;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    overflow: hidden;
    color: ${({ $disabled }) =>
      $disabled ? theme.colors.gray[100] : theme.colors.gray[500]};
    font-feature-settings: "ss10" on;
    text-overflow: ellipsis;

    ${({ $size }) =>
      $size === "small" ? theme.fonts.body2.regular : theme.fonts.body1.regular}
  }
`;

const IconContainer = styled.div<{ $size?: "small" | "normal" }>`
  display: flex;
  width: ${({ $size }) => ($size === "small" ? "32px" : "40px")};
  height: ${({ $size }) => ($size === "small" ? "32px" : "40px")};
  padding: 8px;
  justify-content: center;
  align-items: center;

  svg {
    width: ${({ $size }) => ($size === "small" ? "18px" : "24px")};
    height: ${({ $size }) => ($size === "small" ? "18px" : "24px")};
  }
`;

interface InputProps {
  label?: string;
  required?: boolean;
  locked?: boolean;
  helpText?: string;
  isError?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  width?: number;
  disabled?: boolean;
  size?: "small" | "normal";

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NormalInput = ({
  label,
  helpText,
  required,
  locked,
  isError,
  placeholder,
  icon,
  width = 320,
  disabled,
  size = "normal",

  value,
  onChange = () => {},
  ...props
}: InputProps) => {
  return (
    <Container>
      <LabelContainer>
        {label && (
          <Label $disabled={disabled} $size={size}>
            {label}
          </Label>
        )}
        {required && (
          <Required $disabled={disabled} $size={size}>
            *
          </Required>
        )}
      </LabelContainer>
      <InputContainer
        $isError={isError}
        $width={width}
        $locked={locked}
        $disabled={disabled}
        $size={size}
      >
        <Input
          {...props}
          placeholder={placeholder}
          disabled={locked || disabled}
          value={value}
          onChange={onChange}
          $disabled={disabled}
          $locked={locked}
          $size={size}
        />
        <IconContainer $size={size}>{icon}</IconContainer>
      </InputContainer>
      {helpText && <HelpText $isError={isError}>{helpText}</HelpText>}
    </Container>
  );
};

export default NormalInput;
