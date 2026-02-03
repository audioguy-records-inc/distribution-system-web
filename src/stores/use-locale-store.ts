import { create } from "zustand";
import { Locale, defaultLocale } from "@/i18n/config";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: defaultLocale,
  setLocale: (locale: Locale) => {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    set({ locale });
    window.location.reload();
  },
}));
