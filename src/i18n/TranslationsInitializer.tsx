"use client";

import { useMessages, useLocale } from "next-intl";
import { useEffect } from "react";
import { initClientTranslations } from "./client";

export function TranslationsInitializer() {
  const messages = useMessages();
  const locale = useLocale();

  useEffect(() => {
    initClientTranslations(messages as Record<string, unknown>);
  }, [messages, locale]);

  return null;
}
