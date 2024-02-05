import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';

describe('AuthenticationMockGenerator', () => {
  it('should be instantiable', () => {
    const authenticationMockGenerator = new AuthenticationResponseMockGenerator();
    expect(authenticationMockGenerator).toBeTruthy();
  });
  it('should generate one', () => {
    const authenticationMockGenerator = new AuthenticationResponseMockGenerator();
    const authentication = authenticationMockGenerator.generateOne();
    expect(authentication).toBeTruthy();
  });
  it('should generate many', () => {
    const authenticationMockGenerator = new AuthenticationResponseMockGenerator();
    const authentication = authenticationMockGenerator.generateMany(10);
    expect(authentication).toBeTruthy();
    expect(authentication.length).toBe(10);
  });
});
