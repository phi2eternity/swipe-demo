import { SignupRequest } from '@domain/types/requests/signup';

describe('SignupRequest', () => {
  it('should create an instance', () => {
    const signupRequest: SignupRequest = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    };
    expect(signupRequest).toBeTruthy();
  });
});
