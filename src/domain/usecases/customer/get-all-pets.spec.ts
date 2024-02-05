import { CustomerGetAllPetsUseCase } from '@domain/usecases/customer/get-all-pets';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';
import mockAxios from 'jest-mock-axios';

describe('CustomerGetAllPetsUseCase', () => {

  const petDetailsGenerator = new PetDetailsMockGenerator();

  let getAllPetsUseCase: CustomerGetAllPetsUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    getAllPetsUseCase = container.get(CustomerGetAllPetsUseCase);
  });

  it('should be defined', () => {
    expect(CustomerGetAllPetsUseCase).toBeDefined();
    expect(getAllPetsUseCase).toBeDefined();
  });
  it('should get all pets', async () => {
    const data = petDetailsGenerator.generateMany(10);
    mockAxios.get.mockResolvedValue({ data });
    const result = await getAllPetsUseCase.call();
    expect(result).toEqual(data);
  });
});
