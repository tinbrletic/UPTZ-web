"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    setMounted(true);
    // Try to get locale from URL or localStorage
    const path = window.location.pathname;
    const urlLocale = path.split('/')[1];
    if (urlLocale === 'hr' || urlLocale === 'en') {
      setLocale(urlLocale);
    } else {
      // Fallback to browser language or default to 'en'
      const browserLang = navigator.language.startsWith('hr') ? 'hr' : 'en';
      setLocale(browserLang);
    }
  }, []);

  const translations = {
    en: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      goHome: 'Go Home'
    },
    hr: {
      title: 'Stranica nije pronađena',
      description: 'Stranica koju tražite ne postoji.',
      goHome: 'Početna stranica'
    }
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-center text-white px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-6">{t.title}</h2>
        <p className="text-lg mb-8 opacity-80">
          {t.description}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          {t.goHome}
        </Link>
      </div>
    </div>
  );
}
