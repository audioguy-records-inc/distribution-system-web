import ButtonOutlinedAssistive from "./basic/buttons/ButtonOutlinedAssistive";
import CustomModal from "./CustomModal";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid ${theme.colors.gray[50]};
  border-radius: 8px;
  padding: 12px 16px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 144px;
`;

const UserInfoLabel = styled.div`
  ${theme.fonts.label2.medium};
  color: ${theme.colors.gray[500]};
`;

const UserName = styled.div`
  ${theme.fonts.heading2.medium};
  color: ${theme.colors.gray[800]};
`;

const LoginInfo = () => {
  const { user, logout } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <Container>
      <UserInfoWrapper>
        <UserInfoLabel>로그인 정보</UserInfoLabel>
        <UserName>{user?.displayName}</UserName>
      </UserInfoWrapper>
      <ButtonOutlinedAssistive
        onClick={handleLogoutClick}
        label="로그아웃"
        size="medium"
      />
      <CustomModal
        isOpen={isLogoutModalOpen}
        onRequestClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        content="정말 로그아웃 하시겠어요?"
      />
    </Container>
  );
};

export default LoginInfo;
