"use client";

import { useTranslation } from "@/hooks/useTranslation";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { t, locale, changeLocale } = useTranslation();

  return (
    <div className="relative group">
      <button
        onClick={() => changeLocale(locale === "en" ? "hr" : "en")}
        className={`px-3 py-1 rounded flex items-center space-x-1 transition-all hover:bg-opacity-80 ${className}`}
        aria-label={locale === "en" ? "Switch to Croatian" : "Switch to English"}
      >
        <span className="font-semibold">{locale === "en" ? "EN" : "HR"}</span>
        <svg width="10" height="9" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 7.5L0.602887 0.749999L8.39711 0.75L4.5 7.5Z" fill="white" />
        </svg>
      </button>

      <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <button
          onClick={() => changeLocale("en")}
          className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${locale === "en" ? "font-bold bg-blue-50 dark:bg-blue-900" : ""}`}
        >
          English
        </button>
        <button
          onClick={() => changeLocale("hr")}
          className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${locale === "hr" ? "font-bold bg-blue-50 dark:bg-blue-900" : ""}`}
        >
          Hrvatski
        </button>
      </div>
    </div>
  );
}
