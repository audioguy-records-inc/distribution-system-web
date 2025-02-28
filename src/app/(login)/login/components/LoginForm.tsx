import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomInput from "@/components/basic/CustomInput";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  ${theme.fonts.title1.semibold};
`;

export default function LoginForm() {
  return (
    <Container>
      <Title>로그인</Title>
      <CustomInput label="아이디" placeholder="아이디를 입력해주세요." />
      <CustomInput label="비밀번호" placeholder="비밀번호를 입력해주세요." />
      <ButtonFilledPrimary label="로그인" expand />
    </Container>
  );
}
