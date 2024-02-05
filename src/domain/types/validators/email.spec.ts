import { emailValidator } from '@domain/types/validators/email';
describe('emailValidator', () => {
  it('should return valid: true when email is valid', () => {
    const result = emailValidator("mehmet@gmail.com");
    expect(result.valid).toBe(true);
  });
  it('should return valid: false when email is invalid', () => {
    const result = emailValidator("mehmet");
    expect(result.valid).toBe(false);
  });

});
