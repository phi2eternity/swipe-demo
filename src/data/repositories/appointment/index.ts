import { inject, injectable } from 'inversify';
import { AppointmentRepository } from '@domain/repositories/appointment';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { AppointmentLocalDataSource } from '@data/datasources/appointment/index.local';

@injectable()
export class AppointmentRepositoryImpl implements AppointmentRepository {


  constructor(@inject(AppointmentRemoteDataSource) private remoteDataSource: AppointmentRemoteDataSource, @inject(AppointmentLocalDataSource) private localDataSource: AppointmentLocalDataSource) {
  }

  async cancelAppointment(id: number): Promise<boolean> {
    await this.localDataSource.cancelAppointment(id);
    return this.remoteDataSource.cancelAppointment(id);
  }

  async createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity> {
    const appointment = await this.remoteDataSource.createAppointment(params);
    await this.localDataSource.createAppointment(appointment);
    return appointment;
  }

}
