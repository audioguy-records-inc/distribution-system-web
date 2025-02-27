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

const Label = styled.label<{ $disabled?: boolean }>`
  ${theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.gray[300] : theme.colors.gray[600]};
`;

const Required = styled.span<{ $disabled?: boolean }>`
  ${theme.fonts.body1.medium}
  color: ${({ $disabled }) =>
    $disabled ? theme.colors.red[300] : theme.colors.red[600]};
`;

const HelpText = styled.div<{ $isError?: boolean }>`
  ${theme.fonts.label2.regular}
  color: ${({ $isError }) =>
    $isError ? theme.colors.red[500] : theme.colors.gray[300]};
`;

const TextAreaContainer = styled.div<{
  $isError?: boolean;
  $locked?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  width: 320px;
  height: 160px;
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

const TextArea = styled.textarea<{
  $disabled?: boolean;
  $locked?: boolean;
  $hideScrollbar?: boolean;
}>`
  ${theme.fonts.body1.regular}
  width: 100%;
  height: 100%;
  padding: 12px 14px;
  color: ${({ $locked, $disabled }) =>
    $disabled
      ? theme.colors.gray[100]
      : $locked
      ? theme.colors.gray[500]
      : theme.colors.gray[800]};
  font-feature-settings: "ss10" on;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  overflow-y: auto;

  ${({ $hideScrollbar }) =>
    $hideScrollbar &&
    `
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `}

  &::placeholder {
    color: ${({ $disabled }) =>
      $disabled ? theme.colors.gray[100] : theme.colors.gray[300]};
    font-feature-settings: "ss10" on;
    ${theme.fonts.body1.regular}
  }
`;

interface TextAreaProps {
  label?: string;
  required?: boolean;
  locked?: boolean;
  helpText?: string;
  isError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hideScrollbar?: boolean;
}

const CustomTextArea = ({
  label,
  helpText,
  required,
  locked,
  isError,
  placeholder,
  disabled,
  value,
  onChange = () => {},
  hideScrollbar = false,
  ...props
}: TextAreaProps) => {
  return (
    <Container>
      <LabelContainer>
        {label && <Label $disabled={disabled}>{label}</Label>}
        {required && <Required $disabled={disabled}>*</Required>}
      </LabelContainer>
      <TextAreaContainer
        $isError={isError}
        $locked={locked}
        $disabled={disabled}
      >
        <TextArea
          {...props}
          placeholder={placeholder}
          disabled={locked || disabled}
          value={value}
          onChange={onChange}
          $disabled={disabled}
          $locked={locked}
          $hideScrollbar={hideScrollbar}
        />
      </TextAreaContainer>
      {helpText && <HelpText $isError={isError}>{helpText}</HelpText>}
    </Container>
  );
};

export default CustomTextArea;
