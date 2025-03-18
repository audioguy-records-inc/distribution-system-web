import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface ActivateStateBadgeProps {
  isActive: boolean;
}

const Badge = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.purple[50] : theme.colors.gray[50]};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.green[600] : theme.colors.gray[600]};
  ${theme.fonts.body2.medium}
`;

const ActivateStateBadge: React.FC<ActivateStateBadgeProps> = ({
  isActive,
}) => {
  return <Badge $isActive={isActive}>{isActive ? "활성" : "비활성"}</Badge>;
};

export default ActivateStateBadge;
