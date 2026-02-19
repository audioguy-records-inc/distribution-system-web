import { CurrencyType } from "@/stores/use-currency-store";

interface ExchangeRates {
  USD: number; // 1 USD = ? KRW
  JPY: number; // 1 JPY = ? KRW
}

export function formatCurrency(
  amountInKRW: number,
  currency: CurrencyType,
  exchangeRates: ExchangeRates,
): string {
  if (currency === "KRW") {
    return `₩ ${amountInKRW.toLocaleString()}`;
  }

  if (currency === "USD") {
    const rate = exchangeRates.USD;
    if (!rate || rate === 0) return `$ 0.00`;
    const converted = amountInKRW / rate;
    return `$ ${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (currency === "JPY") {
    const rate = exchangeRates.JPY;
    if (!rate || rate === 0) return `¥ 0`;
    const converted = amountInKRW / rate;
    return `¥ ${Math.round(converted).toLocaleString()}`;
  }

  return amountInKRW.toLocaleString();
}
