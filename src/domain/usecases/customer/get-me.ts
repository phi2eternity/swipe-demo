import {MeResponse} from "@domain/types/responses/me-response";
import {UseCase} from "@quicker/common/use-case";
import {CustomerRepository} from "@domain/repositories/customer";
import {inject, injectable} from "inversify";

export interface GetMeParams {

}

@injectable()
export class GetMeUseCase implements UseCase<GetMeParams, Promise<MeResponse>> {
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }

  call(): Promise<MeResponse> {
    return this.repository.getMe();
  }
}
