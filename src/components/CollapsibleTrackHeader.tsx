import ArrowDownIcon from "./icons/ArrowDownIcon";
import ArrowUpIcon from "./icons/ArrowUpIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useState } from "react";

interface CollapsibleTrackHeaderProps {
  title: string;
  renderComponent?: React.ReactNode;
  disabled?: boolean;
}

const HeaderContainer = styled.div`
  margin-bottom: 16px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  gap: 12px;
`;

const Title = styled.h2`
  ${theme.fonts.heading2.medium};
  color: ${theme.colors.gray[800]};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.purple[600]}; /* purple600 */
`;

const ContentWrapper = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "10000px" : "0")};
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;
`;

const DisableText = styled.div`
  ${theme.fonts.label1.medium};
  color: ${theme.colors.gray[400]};
  display: flex;
  align-items: center;
  padding: 2px 8px;
  background-color: ${theme.colors.gray[50]};
  border-radius: 4px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background-color: ${theme.colors.gray[400]};
    border-radius: 50%;
    margin-right: 6px;
  }
`;

const EnableText = styled.div`
  ${theme.fonts.label1.medium};
  color: ${theme.colors.green[600]};
  display: flex;
  align-items: center;
  padding: 2px 8px;
  background-color: ${theme.colors.green[100]};
  border-radius: 4px;
  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background-color: ${theme.colors.green[600]};
    border-radius: 50%;
    margin-right: 6px;
  }
`;

const CollapsibleTrackHeader: React.FC<CollapsibleTrackHeaderProps> = ({
  title,
  renderComponent,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper onClick={toggleOpen}>
        <Title>{title}</Title>
        {disabled ? (
          <DisableText>
            트랙은 앨범 정보 등록 후 추가 가능합니다. 앨범을 먼저 등록해주세요.
          </DisableText>
        ) : (
          <EnableText>트랙 등록 가능</EnableText>
        )}
        <IconWrapper>
          {isOpen && !disabled ? (
            <ArrowUpIcon
              color={theme.colors.purple[600]}
              width={18}
              height={18}
            />
          ) : (
            <ArrowDownIcon
              color={theme.colors.purple[600]}
              width={18}
              height={18}
            />
          )}
        </IconWrapper>
      </HeaderWrapper>
      <ContentWrapper $isOpen={isOpen && !disabled}>
        {renderComponent}
      </ContentWrapper>
    </HeaderContainer>
  );
};

export default CollapsibleTrackHeader;
