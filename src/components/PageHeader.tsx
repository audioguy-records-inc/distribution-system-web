import styled from "styled-components";
import theme from "@/styles/theme";

const HeaderContainer = styled.div`
  padding: 42px 0;
`;

const Title = styled.div`
  ${theme.fonts.title1.medium};
  color: ${theme.colors.gray[800]};
`;

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default PageHeader;
