import React from "react";
import styled from "styled-components";
import theme from "@/styles/theme";

interface ActivateStateBadgeProps {
  isActive: boolean;
}

const Container = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.green[100] : theme.colors.gray[50]};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.green[600] : theme.colors.gray[400]};
  ${theme.fonts.label1.medium}
  gap: 6px;
`;

const Dot = styled.div<{ $isActive: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $isActive }) =>
    $isActive ? theme.colors.green[600] : theme.colors.gray[400]};
`;

const Badge = styled.div``;

const ActivateStateBadge: React.FC<ActivateStateBadgeProps> = ({
  isActive,
}) => {
  return (
    <Container $isActive={isActive}>
      <Dot $isActive={isActive} />
      <Badge>{isActive ? "활성화" : "비활성화"}</Badge>
    </Container>
  );
};

export default ActivateStateBadge;
