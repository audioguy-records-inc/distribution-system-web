import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CurrencyType = "KRW" | "USD" | "JPY";

interface ExchangeRates {
  USD: number; // 1 USD = ? KRW
  JPY: number; // 1 JPY = ? KRW
}

interface CurrencyStore {
  currency: CurrencyType;
  exchangeRates: ExchangeRates;
  setCurrency: (currency: CurrencyType) => void;
  setExchangeRate: (currency: "USD" | "JPY", rate: number) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: "KRW",
      exchangeRates: {
        USD: 1451,
        JPY: 9,
      },
      setCurrency: (currency) => set({ currency }),
      setExchangeRate: (currency, rate) =>
        set((state) => ({
          exchangeRates: {
            ...state.exchangeRates,
            [currency]: rate,
          },
        })),
    }),
    {
      name: "currency",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
