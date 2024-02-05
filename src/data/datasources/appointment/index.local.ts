import { LocalDataSource } from '@data/datasources/local-data-source';
import { injectable } from 'inversify';
import { AppointmentEntity } from '@domain/types/common/appointment';


@injectable()
export abstract class AppointmentLocalDataSource extends LocalDataSource {

  abstract cancelAppointment(id: number): Promise<void>;

  abstract createAppointment(appointmentEntity: AppointmentEntity): Promise<void>;

}
