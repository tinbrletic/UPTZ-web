"use client";

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import Head from 'next/head';
import { useEffect } from 'react';

interface MetadataProps {
  title?: string;
  description?: string;
}

export default function LanguageMetadata({ title, description }: MetadataProps) {
  const { locale } = useLanguage();
  const { t } = useTranslation();

  // Default values if not provided
  const pageTitle = title || "UPTZ - " + t("introduction");
  const pageDescription = description || t("explore");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const alternateLang = locale === 'en' ? 'hr' : 'en';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname.split('/').slice(2).join('/') : '';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link
          rel="alternate"
          hrefLang={alternateLang}
          href={`/${alternateLang}/${currentPath}`}
        />
        <link
          rel="canonical"
          href={`/${locale}/${currentPath}`}
        />
      </Head>
    </>
  );
}
