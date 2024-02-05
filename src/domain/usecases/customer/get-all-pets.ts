import { inject, injectable } from 'inversify';
import { UseCase } from '@quicker/common/use-case';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { CustomerRepository } from '@domain/repositories/customer';



@injectable()
export class CustomerGetAllPetsUseCase implements UseCase<void, Promise<PetDetailsEntity[]>>{
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }
  call(): Promise<PetDetailsEntity[]> {
    return this.repository.allPets();
  }
}
