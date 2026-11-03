"use client";

import { AuthLevel } from "@/types/user";
import CommunitySection from "./CommunitySection";
import ContentSection from "./ContentSection";
import ContractSection from "./ContractSection";
import ServiceSection from "./ServiceSection";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: #0a0a0a;
  color: #fafafa;
  padding: 28px 24px 48px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #2a2a2a;
  gap: 28px;

  &::-webkit-scrollbar-track {
    background: #0a0a0a;
  }
  &::-webkit-scrollbar-thumb {
    background: #2a2a2a;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    border-right: none;
    border-bottom: 1px solid #2a2a2a;
    position: relative;
    height: auto;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 12px;
`;

const BrandMark = styled.div`
  ${theme.fonts.heading2.medium};
  color: #fafafa;
  letter-spacing: -0.03em;
  line-height: 1.1;
`;

const BrandMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${theme.fonts.mono};
  font-size: 11px;
  line-height: 16px;
  color: #f2592a;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #f2592a;
    flex-shrink: 0;
  }
`;

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <SidebarContainer>
      <Brand>
        <BrandMark>
          Audioguys
          <br />
          Music
        </BrandMark>
        <BrandMeta>Est. 2000 · Seoul</BrandMeta>
      </Brand>
      {user.authLevel === AuthLevel.ADMIN && <ContractSection />}
      {user.authLevel === AuthLevel.ADMIN && (
        <ContentSection authLevel={user.authLevel} />
      )}
      <ServiceSection authLevel={user.authLevel} />
      <CommunitySection />
    </SidebarContainer>
  );
}
