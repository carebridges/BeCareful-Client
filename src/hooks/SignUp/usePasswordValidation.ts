export const isValidPassword = (pw: string) => {
  if (pw.length < 8 || pw.length > 12) return false;

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);

  const categoryCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(
    Boolean,
  ).length;

  return categoryCount >= 2;
};
