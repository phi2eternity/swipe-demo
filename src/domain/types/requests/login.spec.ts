import { LoginRequest } from '@domain/types/requests/login';

describe('LoginRequest', () => {
  it('should create an instance', () => {
    const loginRequest: LoginRequest = {
      email: '',
      password: ''
    };
    expect(loginRequest).toBeTruthy();
  });
});
