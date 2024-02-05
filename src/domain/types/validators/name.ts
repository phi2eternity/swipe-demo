import { ValidationResult } from '@domain/types/validators/result';

export const nameValidator = (name: string): ValidationResult => {
  const nameRegex = /^[\p{Lu}][\p{Ll}]{1,28}(?:\s?[\p{Lu}][\p{Ll}]{0,28}){0,3}$/u;

  if (!nameRegex.test(name)) {
    return {
      valid: false,
      errorMessage: 'Please enter a valid name.',
    };
  }

  return { valid: true };
}
