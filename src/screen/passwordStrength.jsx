export const getPasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbersOrSymbols = /[0-9!@#$%^&*]/.test(password);
  const isLongEnough = password.length >= 8;

  const passed = [hasUpperCase, hasLowerCase, hasNumbersOrSymbols, isLongEnough].filter(Boolean).length;

  let strength = "Weak";
  let color = "error";

  if (passed === 3) {
    strength = "Medium";
    color = "warning";
  } else if (passed === 4) {
    strength = "Strong";
    color = "success";
  }

  return {
    strength,
    color,
    isValid: passed === 4,
  };
};
