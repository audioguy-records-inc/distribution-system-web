import Link from "next/link";
import styled from "styled-components";
import theme from "@/styles/theme";

const MenuGroupButton = styled.div`
  display: flex;
  height: 48px;
  padding: 15px 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  cursor: pointer;

  ${theme.fonts.heading1.semibold};
  color: ${theme.colors.gray[800]};
`;

const MenuGroup = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const MenuLabel = styled.div`
  ${theme.fonts.body1.regular};
  color: ${theme.colors.gray[500]};
  display: flex;
  height: 32px;
  padding: 5px 12px 5px 32px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const MenuItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  height: 52px;
  padding: 11px 12px 11px 32px;
  margin-left: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  text-align: left;

  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.blue[50] : "transparent"};

  color: ${({ $isActive }) =>
    $isActive ? theme.colors.blue[600] : theme.colors.gray[800]};

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? theme.colors.blue[50] : theme.colors.gray[50]};
  }

  ${theme.fonts.body1.medium};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
`;

const MenuItemLink = styled(Link)``;

export { MenuItemLink, MenuItem, MenuGroupButton, MenuGroup, MenuLabel };
