import { inject, injectable } from 'inversify';
import { AppointmentRemoteDataSource } from '@data/datasources/appointment/index.remote';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { CreateAppointmentRequest } from '@domain/types/requests/create-appointment';

@injectable()
export class AppointmentRemoteDataSourceImpl implements AppointmentRemoteDataSource {

  constructor(@inject<HttpClient>(HttpClientSymbol) private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async createAppointment(params: CreateAppointmentRequest): Promise<AppointmentEntity> {
    const response = await this.httpClient.post<CreateAppointmentRequest, AppointmentEntity>('/api/customer/appointment/create', params);
    return response.data as AppointmentEntity;
  }

  async cancelAppointment(id: number): Promise<boolean> {
    const response = await this.httpClient.patch(`/api/customer/appointment/cancel/${id}`);
    return response.status === 200;
  }
}
