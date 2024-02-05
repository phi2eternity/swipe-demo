import { inject, injectable } from 'inversify';
import { UseCase } from '@quicker/common/use-case';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { AppointmentEntity } from '@domain/types/common/appointment';


@injectable()
export class CreateAppointmentUseCase  implements UseCase<CreateAppointmentRequest, Promise<AppointmentEntity>> {
  constructor(@inject(AppointmentRepository) private appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }
  call(params: CreateAppointmentRequest): Promise<AppointmentEntity> {
    return this.appointmentRepository.createAppointment(params);
  }

}
