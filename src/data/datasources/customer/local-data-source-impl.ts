import { inject, injectable } from 'inversify';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';
import { AppointmentCacheProvider, PetDetailsCacheProvider } from '@domain/types/TYPES';
import { CacheProvider } from '@quicker/common/cache-provider';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { OffsetRequest } from '@domain/types/requests/offset';
import { OffsetResponse } from '@domain/types/responses/offset';
import { MeResponse } from '@domain/types/responses/me-response';

@injectable()
export class CustomerLocalDataSourceImpl implements CustomerLocalDataSource {

  constructor(@inject<CacheProvider<AppointmentEntity>>(AppointmentCacheProvider) private appointmentCacheProvider: CacheProvider<AppointmentEntity>,
              @inject<CacheProvider<PetDetailsEntity>>(PetDetailsCacheProvider) private petDetailsCacheProvider: CacheProvider<PetDetailsEntity>)  {
  }

  me(value? : MeResponse): Promise<MeResponse | null>{
    if(!!value) {
      localStorage.setItem('me', JSON.stringify(value));
      return Promise.resolve(value);
    }else{
      const result = localStorage.getItem('me');
      if(result) {
        return Promise.resolve(JSON.parse(result) as MeResponse);
      }else{
        return Promise.resolve(null);
      }
    }

  }



  async allAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const {offset = 50, limit = 0} = request;
    const appointments = await this.appointmentCacheProvider.find({});
    if(offset > appointments.length) {
      return {
        count:0,
        next: null,
        previous: null,
        results: []
      }
    }
    const slice = appointments.slice(offset, offset + limit);
    return {
      count:slice.length,
      next: null,
      previous: null,
      results: slice
    }
  }

  allPets(): Promise<PetDetailsEntity[]> {
    return this.petDetailsCacheProvider.find({});
  }

  createPet(request: PetDetailsEntity): Promise<void> {
    return this.petDetailsCacheProvider.upsert(request);
  }

  async pastAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const pastAppointments = await this.appointmentCacheProvider.find({}).then((appointments) => {
      return appointments.filter((appointment) => {
        const now = new Date().getTime();
        const start = new Date(appointment.start).getTime();
        return  start < now;
      });
    });
    const {offset = 50, limit = 0} = request;
    if(offset > pastAppointments.length) {
      return {
        count:0,
        next: null,
        previous: null,
        results: []
      }
    }
    const slice = pastAppointments.slice(offset, offset + limit);
    return {
      count:slice.length,
      next: null,
      previous: null,
      results: slice
    };


  }

  async upcomingAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {

    const upcomingAppointments = await this.appointmentCacheProvider.find({}).then((appointments) => {
      return appointments.filter((appointment) => {
        const now = new Date().getTime();
        const start = new Date(appointment.start).getTime();
        return start > now;
      });

    });
    const {offset = 50, limit = 0} = request;
    if(offset > upcomingAppointments.length) {
      return {
        count:0,
        next: null,
        previous: null,
        results: []
      }
    }
    const slice = upcomingAppointments.slice(offset, offset + limit);
    return {
      count:slice.length,
      next: null,
      previous: null,
      results: slice
    }
  }

  addAppointments(request:AppointmentEntity[]): Promise<void>{
    return this.appointmentCacheProvider.bulkUpsert(request);
  }

  addPets(request:PetDetailsEntity[]): Promise<void>{
    return this.petDetailsCacheProvider.bulkUpsert(request);
  }
}
