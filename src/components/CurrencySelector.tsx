"use client";

import { CurrencyType, useCurrencyStore } from "@/stores/use-currency-store";
import { useState } from "react";

import styled from "styled-components";
import theme from "@/styles/theme";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  gap: 8px;
  margin-left: auto;
  padding: 12px 14px;
  background: ${theme.colors.gray[25]};
  border: 1px solid ${theme.colors.gray[50]};
  border-radius: 8px;
`;

const ButtonGroup = styled.div<{ $showDivider: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  padding-bottom: ${({ $showDivider }) => ($showDivider ? "6px" : "2px")};
  border-bottom: ${({ $showDivider }) =>
    $showDivider ? `0.5px solid ${theme.colors.gray[100]}` : "none"};
  margin-bottom: ${({ $showDivider }) => ($showDivider ? "2px" : "0")};
`;

const CurrencyButton = styled.button<{ $isActive: boolean }>`
  ${theme.fonts.caption1.medium};
  flex: 1;
  height: 28px;
  padding: 0 10px;
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

const RateInputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${theme.fonts.caption1.medium};
  color: ${theme.colors.gray[500]};
`;

const RateInputLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 10px;
`;

const RateInput = styled.input`
  width: 72px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  ${theme.fonts.caption1.medium};
  color: ${theme.colors.gray[800]};
  text-align: right;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.purple[600]};
  }

  &::-webkit-inner-spin-button {
    margin-left: 10px;
    margin-top: 1px;
  }
`;

const ApplyButton = styled.button`
  ${theme.fonts.caption1.medium};
  height: 28px;
  padding: 0 16px;
  margin-right: 2px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${theme.colors.purple[50]};
  color: ${theme.colors.purple[600]};
  transition: background 0.15s ease;

  &:hover {
    background: ${theme.colors.purple[100]};
  }
`;

const AppliedRate = styled.span`
  ${theme.fonts.caption1.regular};
  color: ${theme.colors.gray[400]};
  text-align: right;
  margin-top: 2px;
`;

const currencies: { type: CurrencyType; label: string }[] = [
  { type: "KRW", label: "₩ KRW" },
  { type: "USD", label: "$ USD" },
  { type: "JPY", label: "¥ JPY" },
];

const CurrencySelector = () => {
  const t = useTranslations("common");
  const { currency, exchangeRates, setCurrency, setExchangeRate } =
    useCurrencyStore();
  const [inputValue, setInputValue] = useState<string>(
    currency !== "KRW" ? String(exchangeRates[currency]) : "",
  );

  const handleCurrencyClick = (type: CurrencyType) => {
    setCurrency(type);
    if (type !== "KRW") {
      setInputValue(String(exchangeRates[type]));
    }
  };

  const handleApply = () => {
    if (currency === "KRW") return;
    const num = parseFloat(inputValue);
    if (!isNaN(num) && num > 0) {
      setExchangeRate(currency, num);
    }
  };

  return (
    <Container>
      <ButtonGroup $showDivider={currency !== "KRW"}>
        {currencies.map((c, index) => (
          <span key={c.type} style={{ display: "contents" }}>
            {index > 0 && <Divider>|</Divider>}
            <CurrencyButton
              $isActive={currency === c.type}
              onClick={() => handleCurrencyClick(c.type)}
            >
              {c.label}
            </CurrencyButton>
          </span>
        ))}
      </ButtonGroup>
      {currency !== "KRW" && (
        <>
          <RateInputGroup>
            <RateInputLeft>
              <span>1 {currency} =</span>
              <RateInput
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApply();
                }}
                min="0"
                step="any"
              />
              <span>KRW</span>
            </RateInputLeft>
            <ApplyButton onClick={handleApply}>{t("apply")}</ApplyButton>
          </RateInputGroup>
          <AppliedRate>
            {t("appliedRate")}: 1 {currency} ={" "}
            {exchangeRates[currency].toLocaleString()} KRW
          </AppliedRate>
        </>
      )}
    </Container>
  );
};

export default CurrencySelector;
