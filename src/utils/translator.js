/**
 * Translates text from English to Bangla using a free API endpoint.
 * Note: This is for demonstration/light usage. For production, use a paid Google Cloud Translation API key.
 * @param {string} text - The text to translate.
 * @returns {Promise<string>} - The translated text.
 */
export const translateToBangla = async (text) => {
  if (!text) return "";
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(
        text,
      )}`,
    );
    const data = await response.json();
    // The structure returned is complex, usually [[["translated_text", "original_text", ...], ...], ...]
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      // Join all segments if it's a long text split into multiple chunks
      return data[0].map((segment) => segment[0]).join("");
    }
    return "";
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
};
