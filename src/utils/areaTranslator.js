import areaTranslations from "../data/areaTranslations.json";

/**
 * Translates area names (divisions/districts) based on current language
 * @param {string} areaName - The area name in English
 * @param {string} language - Current language ('en' or 'bn')
 * @returns {string} - Translated area name or original if not found
 */
export const translateArea = (areaName, language) => {
  if (language === "en" || !areaName) return areaName;
  return areaTranslations[areaName] || areaName;
};

/**
 * Translates an array of area names
 * @param {string[]} areas - Array of area names in English
 * @param {string} language - Current language ('en' or 'bn')
 * @returns {string[]} - Array of translated area names
 */
export const translateAreas = (areas, language) => {
  if (language === "en" || !areas) return areas;
  return areas.map((area) => translateArea(area, language));
};
