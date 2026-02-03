"use client";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import CustomInput from "@/components/basic/CustomInput";
import styled from "styled-components";
import theme from "@/styles/theme";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/use-auth-store";
import { useState } from "react";
import { useUserStore } from "@/stores/use-user-store";
import { useTranslations } from "next-intl";

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
  const { isLoading, user, jsonWebToken, login } = useAuthStore();
  const t = useTranslations("login");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error(t("loginError"));
      return;
    }
    login(email, password);
  };

  return (
    <Container>
      <Title>{t("title")}</Title>
      <CustomInput
        label={t("id")}
        placeholder={t("idPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        label={t("password")}
        placeholder={t("passwordPlaceholder")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonFilledPrimary label={t("loginButton")} expand onClick={handleLogin} />
    </Container>
  );
}
