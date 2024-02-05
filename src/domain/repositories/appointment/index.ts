import { injectable } from 'inversify';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentEntity } from '@domain/types/common/appointment';


@injectable()
export abstract class AppointmentRepository{
  abstract createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity>;

  abstract cancelAppointment(id:number): Promise<boolean>;
}
