import { ValidationResult } from '@domain/types/validators/result';

export const passwordValidator = (password: string): ValidationResult => {
  // Minimum length: 8 characters
  const minLength = 8;

  // At least one uppercase, one lowercase, one number, and one special character
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return {
      valid: false,
      errorMessage: `Password must be at least ${minLength} characters long.`,
    };
  }

  if (!uppercaseRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one uppercase letter.',
    };
  }

  if (!lowercaseRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one lowercase letter.',
    };
  }

  if (!numberRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one number.',
    };
  }

  if (!specialCharRegex.test(password)) {
    return {
      valid: false,
      errorMessage: 'Password must contain at least one special character.',
    };
  }

  return { valid: true };
};

