import { inject, injectable } from 'inversify';
import { CacheProvider } from '@quicker/common/cache-provider';
import { AppointmentCacheProvider } from '@domain/types/TYPES';
import { AppointmentLocalDataSource } from '@data/datasources/appointment/index.local';
import { AppointmentEntity } from '@domain/types/common/appointment';

@injectable()
export class AppointmentLocalDataSourceImpl implements AppointmentLocalDataSource {

  constructor(@inject<CacheProvider<AppointmentEntity>>(AppointmentCacheProvider) private cacheProvider: CacheProvider<AppointmentEntity>) {}

  async cancelAppointment(id: number): Promise<void> {
    return this.cacheProvider.upsert({id: id, status: "Cancelled"});
  }

  async createAppointment(appointmentEntity: AppointmentEntity): Promise<void> {
    return this.cacheProvider.upsert(appointmentEntity);
  }
}
