import { useRouter } from "next/router";
import en from "./en/common.json";
import hr from "./hr/common.json";

const translations = {
  en,
  hr,
};

export function useTranslation() {
  const router = useRouter();
  const { locale } = router;
  const t = (key: string, params?: Record<string, string>) => {
    // Split the key by dots to access nested objects
    const keys = key.split(".");
    // Get the translation object for the current locale or fall back to English
    let translation: unknown =
      translations[locale as keyof typeof translations] || en;

    // Navigate through the nested objects to find the translation
    for (const k of keys) {
      if (translation && typeof translation === "object" && k in translation) {
        translation = (translation as Record<string, unknown>)[k];
      } else {
        // Return the key if translation is not found
        return key;
      }
    }

    // If we have parameters, replace placeholders
    if (params && typeof translation === "string") {
      let finalText: string = translation;
      Object.keys(params).forEach((param) => {
        finalText = finalText.replace(`{{${param}}}`, params[param]);
      });
      return finalText;
    }

    return typeof translation === "string" ? translation : key;
  };

  return { t, locale };
}
