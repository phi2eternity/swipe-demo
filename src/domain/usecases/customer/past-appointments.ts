import { UseCase } from '@quicker/common/use-case';
import { inject, injectable } from 'inversify';
import { CustomerRepository } from '@domain/repositories/customer';
import { OffsetRequest } from '@domain/types/requests/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { OffsetResponse } from '@domain/types/responses/offset';


@injectable()
export class CustomerGetPastAppointmentsUseCase implements UseCase<any, any>{
  constructor(@inject<CustomerRepository>(CustomerRepository) private readonly repository: CustomerRepository) {
    this.repository = repository;
  }

  call(params: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    return this.repository.pastAppointments(params);
  }
}
