import {inject,injectable} from 'inversify';
import {UseCase} from '@quicker/common/use-case';
import {PetDetailsEntity} from '@domain/types/common/pet-details';
import {CustomerRepository} from '@domain/repositories/customer';
import {CreatePetRequest} from '@domain/types/requests/create-pet';

@injectable()
export class CustomerCreatePetUseCase implements UseCase<CreatePetRequest, Promise<PetDetailsEntity>>{
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }
  call(request: CreatePetRequest): Promise<PetDetailsEntity> {
    return this.repository.createPet(request);
  }
}
