import { passwordValidator } from '@domain/types/validators/password';

describe('passwordValidator', () => {
  it('should return valid: true when password is valid', () => {
    const result = passwordValidator('Password1!');
    expect(result.valid).toBe(true);
  });
  it('should return valid: false when password is too short', () => {
    const result = passwordValidator('Pass1!');
    expect(result.valid).toBe(false);
  });
  it('should return valid: false when password does not contain an uppercase letter', () => {
    const result = passwordValidator('password1!');
    expect(result.valid).toBe(false);
  });
  it('should return valid: false when password does not contain a lowercase letter', () => {
    const result = passwordValidator('PASSWORD1!');
    expect(result.valid).toBe(false);
  });
  it('should return valid: false when password does not contain a number', () => {
    const result = passwordValidator('Password!');
    expect(result.valid).toBe(false);

  });
  it('should return valid: false when password does not contain a special character', () => {
    const result = passwordValidator('Password1');
    expect(result.valid).toBe(false);
  });


});
