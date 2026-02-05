import i18n from "../i18n";

/**
 * Helper to get the correct field based on current language.
 * @param {Object} item - The data object (e.g., candidate).
 * @param {string} fieldName - The base field name (e.g., 'name').
 * @returns {any} - The value of the field in the current language or fallback.
 */
export const getLangField = (item, fieldName) => {
  if (!item) return "";

  const currentLang = i18n.language;
  const isBangla = currentLang === "bn";

  if (isBangla) {
    // Try to get specific bangla field e.g. 'name_bn'
    const bnField = `${fieldName}_bn`;
    if (item[bnField]) {
      return item[bnField];
    }
  }

  // Fallback to English (base field)
  return item[fieldName];
};
