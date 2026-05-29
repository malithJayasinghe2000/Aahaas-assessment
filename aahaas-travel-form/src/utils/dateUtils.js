/**
 * Returns today's date in ISO format (YYYY-MM-DD).
 * Used to set the `min` attribute on date inputs.
 *
 * @returns {string} e.g. "2026-05-29"
 */
export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Checks whether a date string represents a date in the past.
 *
 * @param {string} dateStr — A date string parseable by `new Date()`.
 * @returns {boolean} `true` if the date is before today.
 */
export const isDateInPast = (dateStr) => {
  const selected = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
};

/**
 * Formats a date string into a human-readable format.
 *
 * @param {string} dateStr — A date string parseable by `new Date()`.
 * @returns {string} 
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
