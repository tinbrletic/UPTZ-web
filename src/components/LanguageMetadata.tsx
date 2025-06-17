"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function LanguageMetadata() {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
