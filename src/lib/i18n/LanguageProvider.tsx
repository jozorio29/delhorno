"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DictKey, Lang, LANGS, translations } from "./translations";

type I18nContext = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
};

const LanguageContext = createContext<I18nContext>({
  lang: "es",
  setLang: () => {},
  t: (key) => translations.es[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dh-lang") as Lang | null;
      if (saved && LANGS.includes(saved)) setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("dh-lang", next);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: DictKey) => translations[lang][key] ?? translations.es[key],
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useI18n = () => useContext(LanguageContext);

/** Texto traducido inline — usable desde server components. */
export function T({ k }: { k: DictKey }) {
  const { t } = useI18n();
  return <>{t(k)}</>;
}
