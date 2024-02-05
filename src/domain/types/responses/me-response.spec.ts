import {MeResponse} from "@domain/types/responses/me-response";

describe('Me Response', () => {
  it('should be a valid response', () => {
    const data = {
      id: 1,
      lifetime_tips: 1,
      lifetime_product_sales: 1,
      lifetime_service_sales: 1,
      dogs: [],
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
      name: 'John Doe',
      uid: '123456789',
      email: '',
      phone: '1234567890',
      address: '123 Main St',
      role: 1,
      user: 1
    } as MeResponse;
    expect(data).toBeDefined();
  });
});
