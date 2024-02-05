import { inject, injectable } from 'inversify';
import { CustomerRepository } from '@domain/repositories/customer';
import { UseCase } from '@quicker/common/use-case';
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { LoginRequest } from '@domain/types/requests/login';

@injectable()
export class CustomerLoginUseCase implements UseCase<LoginRequest, Promise<AuthenticationResponse>> {
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }

  call(params: LoginRequest): Promise<AuthenticationResponse> {
    return this.repository.login(params);
  }
}
