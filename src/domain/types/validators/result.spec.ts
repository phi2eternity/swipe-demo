import { ValidationResult } from '@domain/types/validators/result';

describe('ValidationResult', () => {
  it('should be defined', () => {
    const result = {
      valid: true,
    } as ValidationResult;
    expect(result).toBeDefined();
  });
  it('should be defined with error message', () => {
    const result = {
      valid: false,
      errorMessage: 'Error',
    } as ValidationResult;
    expect(result).toBeDefined();
  });
});
