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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
