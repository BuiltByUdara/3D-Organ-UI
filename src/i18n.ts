import { create } from "zustand";
import { useCallback } from "react";
import { persist } from "zustand/middleware";
import si from "./locales/si.json";
import ta from "./locales/ta.json";
export type Language = "en" | "si" | "ta";
export const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
];
export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "si" || value === "ta";
}
export const useLanguage = create<{
  language: Language;
  setLanguage: (language: Language) => void;
}>()(
  persist(
    (set) => ({ language: "en", setLanguage: (language) => set({ language }) }),
    {
      name: "organui-language-v1",
      merge: (persisted, current) => {
        const value = (persisted as { language?: unknown } | null)?.language;
        return { ...current, language: isLanguage(value) ? value : "en" };
      },
    },
  ),
);
const dictionaries: Record<Language, Record<string, string>> = {
  en: {},
  si,
  ta,
};
export function hasTranslation(language: Language, text: string) {
  return language === "en" || Object.hasOwn(dictionaries[language], text);
}
export function translate(
  language: Language,
  text: string,
  params: Record<string, string | number> = {},
) {
  return (dictionaries[language][text] ?? text).replace(
    /\{(\w+)\}/g,
    (match, key: string) => String(params[key] ?? match),
  );
}
export function useTranslation() {
  const language = useLanguage((s) => s.language);
  const t = useCallback(
    (text: string, params?: Record<string, string | number>) =>
      translate(language, text, params),
    [language],
  );
  return { language, t };
}
