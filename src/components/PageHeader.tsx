"use client";

import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

const HeaderContainer = styled.div`
  padding: 42px 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Title = styled.div`
  ${theme.fonts.title1.medium};
  color: ${theme.colors.gray[800]};
`;

const RequiredInfo = styled.div`
  ${theme.fonts.body2.medium};
  color: ${theme.colors.gray[600]};
  display: flex;
  gap: 8px;
`;

const RequiredText = styled.span`
  color: ${theme.colors.red[500]};
`;

const OptionalText = styled.span`
  color: ${theme.colors.blue[500]};
`;

interface PageHeaderProps {
  title: string;
  showRequiredInfo?: boolean;
}

const PageHeader = ({ title, showRequiredInfo = false }: PageHeaderProps) => {
  const t = useTranslations("common");
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {showRequiredInfo && (
        <RequiredInfo>
          <RequiredText>*</RequiredText>
          <span>{t("requiredDdex")}</span>
          <OptionalText>*</OptionalText>
          <span>{t("requiredSettlement")}</span>
        </RequiredInfo>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;
