/** Upper bound on list length, so a broken t() can never loop forever. */
const MAX_ITEMS = 100;

/**
 * Reads a translated string list (e.g. "projects.detail.karolina.autonomousSystem.perception.points").
 *
 * t() only returns strings, so the list is read item by item ("<key>.0", "<key>.1", ...)
 * until an index is missing. The translation decides the length; the fallback is used
 * only when the list is not translated at all.
 *
 * @param t - The translation function from useTranslation hook (returns the key when missing)
 * @param baseKey - The base key for the array
 * @param fallbackArray - English strings to use when the list has no translation
 * @returns Array of translated strings
 */
export const getTranslationArray = (
  t: (key: string) => string,
  baseKey: string,
  fallbackArray: string[]
): string[] => {
  const items: string[] = [];
  for (let index = 0; index < MAX_ITEMS; index++) {
    const indexedKey = `${baseKey}.${index}`;
    const translation = t(indexedKey);
    if (translation === indexedKey) break;
    items.push(translation);
  }
  return items.length > 0 ? items : fallbackArray;
};
