import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import en from "./locales/en.json";
import id from "./locales/id.json";

type Locale = "en" | "id";

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, any>> = { en, id };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Retrieves a nested value from an object using dot-notation key.
 * Example: getNestedValue(obj, "header.leagues") => obj.header.leagues
 */
const getNestedValue = (obj: Record<string, any>, key: string): string => {
  return key.split(".").reduce((acc, part) => acc?.[part], obj) as unknown as string;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem("sportify_locale");
    return (stored === "en" || stored === "id") ? stored : "en";
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("sportify_locale", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(translations[locale], key);
      return value ?? key;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, toggleLocale, t }),
    [locale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
