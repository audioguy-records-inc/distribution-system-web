"use client";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomInput from "@/components/basic/CustomInput";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  ${theme.fonts.title1.semibold};
`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, user, jsonWebToken, login } = useUserStore();

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    login(email, password);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <CustomInput
        label="아이디"
        placeholder="아이디를 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonFilledPrimary label="로그인" expand onClick={handleLogin} />
    </Container>
  );
}
