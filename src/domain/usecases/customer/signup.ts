import { inject, injectable } from 'inversify';
import { CustomerRepository } from '@domain/repositories/customer';
import { UseCase } from '@quicker/common/use-case';
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { SignupRequest } from '@domain/types/requests/signup';

@injectable()
export class CustomerSignupUseCase implements UseCase<SignupRequest, Promise<AuthenticationResponse>> {
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }

  call(params: SignupRequest): Promise<AuthenticationResponse> {
    return this.repository.signup(params);

  }
}
