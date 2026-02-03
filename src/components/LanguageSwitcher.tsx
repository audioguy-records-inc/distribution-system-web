"use client";

import { useLocaleStore } from "@/stores/use-locale-store";
import { locales, Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import styled from "styled-components";
import theme from "@/styles/theme";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const LangButton = styled.button<{ $isActive: boolean }>`
  ${theme.fonts.caption1.medium};
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ $isActive }) =>
    $isActive ? theme.colors.purple[600] : "transparent"};
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.white : theme.colors.gray[400]};

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? theme.colors.purple[600] : theme.colors.gray[25]};
    color: ${({ $isActive }) =>
      $isActive ? theme.colors.white : theme.colors.gray[600]};
  }
`;

const Divider = styled.span`
  color: ${theme.colors.gray[100]};
  ${theme.fonts.caption1.regular};
  user-select: none;
`;

const localeLabels: Record<Locale, string> = {
  ko: "KR",
  en: "EN",
  ja: "JP",
};

const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const { setLocale } = useLocaleStore();

  return (
    <Container>
      {locales.map((locale, index) => (
        <span key={locale} style={{ display: "flex", alignItems: "center" }}>
          {index > 0 && <Divider>|</Divider>}
          <LangButton
            $isActive={currentLocale === locale}
            onClick={() => setLocale(locale)}
          >
            {localeLabels[locale]}
          </LangButton>
        </span>
      ))}
    </Container>
  );
};

export default LanguageSwitcher;
