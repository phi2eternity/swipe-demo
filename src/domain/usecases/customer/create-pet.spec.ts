import { CustomerCreatePetUseCase } from '@domain/usecases/customer/create-pet';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import mockAxios from 'jest-mock-axios';
import { PetDetailsMockGenerator } from '@domain/types/__mock__/pet-details';

describe('CustomerCreatePetUseCase',()=>{
  let useCase: CustomerCreatePetUseCase;
  let container: Container;
  const petDetailsMockGenerator = new PetDetailsMockGenerator();
  beforeAll(()=>{
    container = getTestContainer();
    useCase = container.get(CustomerCreatePetUseCase);

  });

  it('should be defined.',()=>{
    expect(useCase).toBeDefined();
  });

  it('should create a pet',async ()=>{
    const request = {
      name: 'test',
      breed: 'test',
      age: 1,
      weight:1,
      gender:"Male"
    } as CreatePetRequest;
    const data = petDetailsMockGenerator.generateOne();
    mockAxios.post.mockResolvedValueOnce({data});

    const result = await useCase.call(request);
    expect(result).toBeDefined();
    expect(result).toEqual(data);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/customer/pet/create',request,undefined);

  })
});
