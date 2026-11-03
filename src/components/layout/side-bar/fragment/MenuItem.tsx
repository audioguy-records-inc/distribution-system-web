import Link from "next/link";
import styled from "styled-components";
import theme from "@/styles/theme";

const MenuGroupButton = styled.div`
  display: flex;
  height: 44px;
  padding: 0 8px;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 10px;
  cursor: pointer;
  ${theme.fonts.mono};
  font-size: 12px;
  line-height: 16px;
  color: #fafafa;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #f2592a;
    flex-shrink: 0;
  }

  > :last-child {
    margin-left: auto;
    display: flex;
  }

  svg path {
    stroke: #cacaca;
  }
`;

const MenuGroup = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const MenuLabel = styled.div`
  ${theme.fonts.mono};
  font-size: 11px;
  line-height: 16px;
  color: #8a8a8a;
  display: flex;
  height: 28px;
  padding: 0 8px 0 8px;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 10px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #f2592a;
    flex-shrink: 0;
  }
`;

const MenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 0 12px;
  margin-left: 16px;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  border-radius: 2px;
  text-align: left;
  transition: background-color 180ms ease, color 180ms ease;

  background-color: ${({ $isActive }) =>
    $isActive ? "#1a1a1a" : "transparent"};

  color: ${({ $isActive }) => ($isActive ? "#4fe699" : "#eaeaea")};

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? "#1a1a1a" : "#2a2a2a"};
  }

  ${({ $isActive }) =>
    $isActive
      ? `
    &::before {
      content: "";
      width: 6px;
      height: 6px;
      background: #4fe699;
      flex-shrink: 0;
    }
  `
      : ""}

  ${theme.fonts.body2.medium};
  font-weight: 400;
`;

const MenuItemLink = styled(Link)``;

export { MenuItemLink, MenuItem, MenuGroupButton, MenuGroup, MenuLabel };
