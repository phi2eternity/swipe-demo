import { inject, injectable } from 'inversify';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { UseCase } from '@quicker/common/use-case';

@injectable()
export class CancelAppointmentUseCase implements UseCase<number, Promise<boolean>>{
  constructor(@inject(AppointmentRepository) private appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }
  call(id: number): Promise<boolean> {
    return this.appointmentRepository.cancelAppointment(id);
  }
}
