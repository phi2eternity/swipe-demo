import { CreatePetRequest } from '@domain/types/requests/create-pet';

describe('CreatePetRequest', () => {
  it('should be created with all properties', () => {
    const request = {
      name: 'Johnny',
      breed: 'Poodle',
      weight: 10,
      age: 3,
      gender:"Female"
    } as CreatePetRequest;
    expect(request).toBeDefined();
  });
});
