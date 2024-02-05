import { PetEntity } from './pet';
describe('Pet entity',() => {
  it('should be defined', () => {
    const data = {
      id: 1,
      created_at: '2020-01-01T00:00:00.000Z',
      updated_at: '2020-01-01T00:00:00.000Z',
      name: 'Fido',
      breed: 'Poodle',
      age: 1,
      weight: 1,
      description:'Fido is a poodle',
      employee_notes:'Fido is a poodle',
      customer_notes:'Fido is a poodle',
      coat_type:'Poodle',
      owner:1
    } as PetEntity;

    expect(data).toBeDefined();

  });
});
