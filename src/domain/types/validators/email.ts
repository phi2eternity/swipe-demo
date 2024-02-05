import { ValidationResult } from '@domain/types/validators/result';

export const emailValidator = (email: string): ValidationResult => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      errorMessage: 'Please enter a valid email address.',
    };
  }

  return { valid: true };
};
