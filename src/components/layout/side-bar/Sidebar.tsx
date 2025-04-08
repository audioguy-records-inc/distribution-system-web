"use client"; // 이벤트 핸들링 등 클라이언트 컴포넌트 기능 사용 시

import ArrowDownIcon from "../../icons/ArrowDownIcon";
import ArrowUpIcon from "../../icons/ArrowUpIcon";
import { AuthLevel } from "@/types/user";
import CommunitySection from "./CommunitySection";
import ContentSection from "./ContentSection";
import ContractSection from "./ContractSection";
import Gap from "../../basic/Gap";
import Link from "next/link";
import ServiceSection from "./ServiceSection";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";
import { useState } from "react";

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 320px;
  background-color: ${theme.colors.gray[25]};
  padding: 100px 28px;
  position: fixed; /* 사이드바 고정 */
  height: 100vh; /* 전체 높이 사용 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하도록 */

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    position: relative; /* 모바일에서는 고정하지 않음 */
    height: auto; /* 모바일에서는 자동 높이 */
  }

  gap: 32px;
`;

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  return (
    <SidebarContainer>
      {user.authLevel === AuthLevel.ADMIN && <ContractSection />}
      {user.authLevel === AuthLevel.ADMIN && (
        <ContentSection authLevel={user.authLevel} />
      )}
      <ServiceSection authLevel={user.authLevel} />
      <CommunitySection />
    </SidebarContainer>
  );
}
