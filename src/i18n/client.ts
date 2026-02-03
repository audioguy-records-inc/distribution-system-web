import { Locale, defaultLocale } from "./config";

let cachedMessages: Record<string, unknown> = {};

export function initClientTranslations(
  messages: Record<string, unknown>,
) {
  cachedMessages = messages;
}

export function t(
  key: string,
  params?: Record<string, string | number>,
): string {
  const keys = key.split(".");
  let value: unknown = cachedMessages;
  for (const k of keys) {
    if (value && typeof value === "object") {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  if (typeof value !== "string") return key;

  if (params) {
    return value.replace(
      /\{(\w+)\}/g,
      (_, paramKey) => String(params[paramKey] ?? `{${paramKey}}`),
    );
  }
  return value;
}
