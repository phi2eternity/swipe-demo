import { AuthenticationResponse } from '@domain/types/responses/authentication';


describe('AuthenticationResponse', () => {
  it('should be instantiable', () => {
    const authenticationResponse = {
      token: 'token',
      profile: {
        id: 1,
        lifetime_tips: 1,
        lifetime_product_sales: 1,
        lifetime_service_sales: 1,
        dogs: [],
        created_at: 'created_at',
        updated_at: 'updated_at',
        name: 'name',
        uid: 'uid',
        email: 'email',
        phone: 'phone',
        address: 'address',
        role: 1,
      user:1
      }
    } as AuthenticationResponse;
   expect(authenticationResponse).toBeTruthy();
  });
});
