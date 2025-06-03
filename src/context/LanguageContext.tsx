"use client";

import { useParams, useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'hr';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const router = useRouter();

  // Get current locale from URL
  const currentLocale = params?.lang as Locale || 'en';
  const [locale, setLocaleState] = useState<Locale>(currentLocale);

  useEffect(() => {
    // Update locale when URL changes
    if (currentLocale && (currentLocale === 'en' || currentLocale === 'hr')) {
      setLocaleState(currentLocale);
      document.documentElement.lang = currentLocale;

      // Store preference in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', currentLocale);
      }
    }
  }, [currentLocale]);

  const handleSetLocale = (newLocale: Locale) => {
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }

    // Update the language by replacing the path
    const path = window.location.pathname;
    const segments = path.split('/');

    // The first segment should be the language (empty string, then language code)
    if (segments.length > 1) {
      segments[1] = newLocale;
      const newPath = segments.join('/');

      // Navigate to the new path
      router.push(newPath + window.location.search);
    }

    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
