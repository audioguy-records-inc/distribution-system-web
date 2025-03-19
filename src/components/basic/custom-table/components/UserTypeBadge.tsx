import React from "react";
import { UserType } from "@/types/user";
import styled from "styled-components";
import theme from "@/styles/theme";

interface UserTypeBadgeProps {
  type: UserType;
}

const Container = styled.div<{ $type: UserType }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 100px;
  background-color: ${({ $type }) =>
    $type === UserType.COMPANY
      ? theme.colors.blue[50]
      : theme.colors.purple[50]};
  color: ${({ $type }) =>
    $type === UserType.COMPANY
      ? theme.colors.blue[600]
      : theme.colors.purple[600]};
  ${theme.fonts.label1.medium}
  gap: 6px;
`;

const Badge = styled.div``;

const UserTypeBadge: React.FC<UserTypeBadgeProps> = ({ type }) => {
  return (
    <Container $type={type}>
      <Badge>{type === UserType.COMPANY ? "사업자" : "개인"}</Badge>
    </Container>
  );
};

export default UserTypeBadge;
