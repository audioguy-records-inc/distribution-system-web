"use client"; // 이벤트 핸들링 등 클라이언트 컴포넌트 기능 사용 시

import Link from "next/link";
import styled from "styled-components";

const SidebarContainer = styled.nav`
  /* width: 240px; */
  min-width: 240px;
  background-color: #f3f4f6;
  border-right: 1px solid #e5e7eb;
  padding: 100px 28px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const Logo = styled.div``;

const LogoBold = styled.div;

const MenuList = styled.ul`
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 1rem 0;

  a {
    text-decoration: none;
    color: #333;

    &:hover {
      color: #0070f3;
      text-decoration: underline;
    }
  }
`;

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Logo>My Sidebarasdfsdfdsasdfsdfsdf</Logo>
      <MenuList>
        <MenuItem>
          <Link href="/contract/dsp/list">리스트 조회/등록</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/about">About</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/contact">Contact</Link>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
}
