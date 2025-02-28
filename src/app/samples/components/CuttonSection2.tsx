import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonIconFilled from "@/components/basic/buttons/ButtonIconFilled";
import ButtonIconNormal from "@/components/basic/buttons/ButtonIconNormal";
import ButtonIconOutLined from "@/components/basic/buttons/ButtonIconOutLined";
import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedPrimary from "@/components/basic/buttons/ButtonOutlinedPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import ButtonTextAssistive from "@/components/basic/buttons/ButtonTextAssistive";
import ButtonTextPrimary from "@/components/basic/buttons/ButtonTextPrimary";
import PlaceholderIcon from "@/components/icons/PlaceholderIcon";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function ButtonSection() {
  return (
    <Container>
      <ButtonWrapper>
        <ButtonFilledPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
        />
        <ButtonFilledPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonFilledPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonFilledPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="large"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonOutlinedPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
        />
        <ButtonOutlinedPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonOutlinedPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonOutlinedPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="large"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonOutlinedSecondary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
        />
        <ButtonOutlinedSecondary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonOutlinedSecondary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonOutlinedSecondary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="large"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonOutlinedAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonOutlinedAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonOutlinedAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="medium"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonTextPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonTextPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonTextPrimary
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="medium"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonTextAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonTextAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonTextAssistive
          label="Label"
          leftIcon={<PlaceholderIcon />}
          rightIcon={<PlaceholderIcon />}
          disabled
          size="medium"
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonIconNormal
          icon={<PlaceholderIcon />}
          // disabled
          size="large"
        />
        <ButtonIconNormal
          icon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonIconNormal
          icon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonIconNormal icon={<PlaceholderIcon />} disabled size="large" />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonIconOutLined
          icon={<PlaceholderIcon />}
          // disabled
          size="large"
        />
        <ButtonIconOutLined
          icon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonIconOutLined
          icon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonIconOutLined icon={<PlaceholderIcon />} disabled size="large" />
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonIconFilled
          icon={<PlaceholderIcon />}
          // disabled
          size="large"
        />
        <ButtonIconFilled
          icon={<PlaceholderIcon />}
          // disabled
          size="medium"
        />
        <ButtonIconFilled
          icon={<PlaceholderIcon />}
          // disabled
          size="small"
        />
        <ButtonIconFilled icon={<PlaceholderIcon />} disabled size="large" />
      </ButtonWrapper>
    </Container>
  );
}
