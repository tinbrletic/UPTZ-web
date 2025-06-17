// Import translation files
import enTranslations from "../translations/en/common.json";
import hrTranslations from "../translations/hr/common.json";

// Type definitions
type TranslationData = Record<string, unknown>;
type Locale = "en" | "hr";

/**
 * Helper function to get array translations when the translation hook doesn't handle arrays properly
 * This works around the limitation where t() returns the key string instead of the actual array
 *
 * @param t - The translation function from useTranslation hook
 * @param baseKey - The base key for the array (e.g., "projects.detail.project.section.points")
 * @param fallbackArray - Array of English fallback strings to use if translation fails completely
 * @returns Array of translated strings
 */
export const getTranslationArray = (
  t: (key: string) => string,
  baseKey: string,
  fallbackArray: string[]
): string[] => {
  // First, try to get the array directly from translations
  const directArray = t(baseKey);
  if (Array.isArray(directArray) && directArray.length > 0) {
    return directArray;
  }

  // If direct array access fails, try accessing individual array elements by index
  const translatedArray = fallbackArray.map((fallback, index) => {
    const indexedKey = `${baseKey}.${index}`;
    const translation = t(indexedKey);

    // If translation returns the key itself (meaning translation failed), use fallback
    return translation.includes(baseKey) ? fallback : translation;
  });

  return translatedArray;
};

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
