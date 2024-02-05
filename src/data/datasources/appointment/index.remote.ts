import { injectable } from 'inversify';
import { RemoteDataSource } from '@data/datasources/remote-data-source';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

@injectable()
export abstract class AppointmentRemoteDataSource extends RemoteDataSource{

  abstract createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity>;

  abstract cancelAppointment(id:number): Promise<boolean>;
}
