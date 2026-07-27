export const STRENGTH_COLORS = ['#f43f5e', '#f59e0b', '#FF6D29', '#10b981'];
export const STRENGTH_TEXTS = ['Weak', 'Fair', 'Good', 'Strong'];

/**
 * Calculates password strength score (0 to 4), text label, and color.
 * 
 * @param {string} pwd Password string
 * @returns {{ score: number, label: string, color: string }}
 */
export const getPasswordStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  return {
    score,
    label: STRENGTH_TEXTS[score - 1] || '',
    color: score > 0 ? STRENGTH_COLORS[score - 1] : '',
  };
};
