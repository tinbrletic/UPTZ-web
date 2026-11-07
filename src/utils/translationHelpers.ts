// Import translation files
import enTranslations from "../translations/en/common.json";
import hrTranslations from "../translations/hr/common.json";
import { getTranslationArray } from "./translationArray";

// Type definitions
type TranslationData = Record<string, unknown>;
type Locale = "en" | "hr";

export { getTranslationArray };

/**
 * Helper function specifically for project detail arrays
 * Pre-configured for the common project detail structure
 *
 * @param t - The translation function from useTranslation hook
 * @param projectName - Name of the project (e.g., "maloVitra", "deltaOne")
 * @param sectionPath - Path to the section (e.g., "vesselConstruction.cockpitConstruction.points")
 * @param fallbackArray - Array of English fallback strings
 * @returns Array of translated strings
 */
export const getProjectDetailArray = (
  t: (key: string) => string,
  projectName: string,
  sectionPath: string,
  fallbackArray: string[]
): string[] => {
  const baseKey = `projects.detail.${projectName}.${sectionPath}`;
  return getTranslationArray(t, baseKey, fallbackArray);
};

/**
 * Helper function to get complex translation objects (arrays, objects) by accessing translations directly
 * This bypasses the string-only limitation of the t() function
 *
 * @param locale - Current locale ("en" | "hr")
 * @param key - The translation key to access
 * @param fallback - Fallback data if translation fails
 * @returns The translated data or fallback
 */
export const getTranslationObject = <T>(
  locale: Locale,
  key: string,
  fallback: T
): T => {
  try {
    // Get translations based on locale
    const translations: TranslationData =
      locale === "hr" ? hrTranslations : enTranslations;

    // Split the key by dots to access nested objects
    const keys = key.split(".");
    let translation: unknown = translations;

    // Navigate through the nested objects to find the translation
    for (const k of keys) {
      if (
        translation &&
        typeof translation === "object" &&
        translation !== null &&
        k in translation
      ) {
        translation = (translation as Record<string, unknown>)[k];
      } else {
        // Return fallback if translation path is not found
        return fallback;
      }
    }

    return (translation as T) || fallback;
  } catch (error) {
    console.warn(`Failed to get translation object for key: ${key}`, error);
    return fallback;
  }
};
