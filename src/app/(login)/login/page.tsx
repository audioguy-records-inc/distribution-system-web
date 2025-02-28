"use client";

import Image from "next/image";
import LoginForm from "./components/LoginForm";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 3rem 3.75rem; /* 48px 60px */
  gap: 1.25rem;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  flex: 1;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoginPage() {
  return (
    <Container>
      <LeftSection>
        <Image
          src="/assets/images/login.png"
          alt="login-bg"
          fill
          style={{ objectFit: "cover" }}
        />
      </LeftSection>
      <RightSection>
        <LoginForm />
      </RightSection>
    </Container>
  );
}
