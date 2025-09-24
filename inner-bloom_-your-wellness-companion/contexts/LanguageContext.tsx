
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { Language } from '../types';
import { translations } from '../translations';

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, ...args: unknown[]) => string;
  isLanguageSet: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  isLanguageSet: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLanguageSet, setIsLanguageSet] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('innerbloom-language') as Language | null;
    if (storedLang) {
      setLanguageState(storedLang);
    }
    setIsLanguageSet(!!storedLang);
  }, []);
  
  const setLanguage = (lang: Language) => {
    localStorage.setItem('innerbloom-language', lang);
    setLanguageState(lang);
    setIsLanguageSet(true);
  };

  const t = useCallback((key: TranslationKey, ...args: unknown[]): string => {
    const translation = translations[language][key] || translations.en[key];
    if (typeof translation === 'function') {
      return (translation as (...args: unknown[]) => string)(...args);
    }
    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLanguageSet }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);