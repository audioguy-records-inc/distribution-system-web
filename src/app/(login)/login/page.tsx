"use client";

import { API_URL } from "@/constants/api";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import styled from "styled-components";
import { useAuthStore } from "@/stores/use-auth-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user-store";

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
  const router = useRouter();
  console.log("moonsae env", process.env.NODE_ENV);
  console.log("moonsae api", API_URL);
  const user = useAuthStore((state) => state.user);
  console.log("moonsae user", user);

  useEffect(() => {
    if (user) {
      router.push("/"); // 또는 router.push('/home') 등 홈 경로로 설정
    }
  }, [user, router]);

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
