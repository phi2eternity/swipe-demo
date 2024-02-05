import { CustomerRemoteDataSource } from '@data/datasources/customer/remote-data-source';
import { MeResponse } from '@domain/types/responses/me-response';
import { inject, injectable } from 'inversify';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';
import { SignupRequest } from '@domain/types/requests/signup';
import { LoginRequest } from '@domain/types/requests/login';
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { OffsetRequest } from '@domain/types/requests/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { OffsetResponse } from '@domain/types/responses/offset';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';


@injectable()
export class CustomerRemoteDataSourceImpl implements CustomerRemoteDataSource {

  constructor(@inject<HttpClient>(HttpClientSymbol) private client: HttpClient) {
    this.client = client;
  }

  async getMe(): Promise<MeResponse> {
    const response = await this.client.get<MeResponse>('/api/me');
    return response.data as MeResponse;
  }

  async login(request: LoginRequest): Promise<AuthenticationResponse> {
    const { email, password } = request;
    const response = await this.client.post<LoginRequest, AuthenticationResponse>('/api/auth/customer/login', {
      email, password,
    });
    if(response.status === 200){
      const {token} = response.data;
      this.client.setAuthToken(token);
    }
    return response.data as AuthenticationResponse;
  }

  async signup(request: SignupRequest): Promise<AuthenticationResponse> {
    const {
      first_name, last_name, email, password,
    } = request;
    const response = await this.client.post<SignupRequest, AuthenticationResponse>('/api/auth/customer/register', {
      first_name, last_name, email, password,
    });
    if(response.status === 200){
      const {token} = response.data;
      this.client.setAuthToken(token);
    }
    return response.data as AuthenticationResponse;
  }

  async upcomingAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const response = await this.client.get<OffsetResponse<AppointmentEntity>>('/api/customer/appointments/upcoming',{
      params: request
    });
    return response.data as OffsetResponse<AppointmentEntity>;
  }

  async pastAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const response = await this.client.get<OffsetResponse<AppointmentEntity>>('/api/customer/appointments/past',{
      params: request
    });
    return response.data as OffsetResponse<AppointmentEntity>;
  }

  async allAppointments(request: OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    const response = await this.client.get<OffsetResponse<AppointmentEntity>>('/api/customer/appointments/all',{
      params: request
    });
    return response.data as OffsetResponse<AppointmentEntity>;
  }

  async allPets(): Promise<PetDetailsEntity[]> {
    const response = await this.client.get<PetDetailsEntity[]>('/api/customer/pets/all');
    return response.data as PetDetailsEntity[];
  }

  async createPet(request: CreatePetRequest): Promise<PetDetailsEntity> {
    const response = await this.client.post<CreatePetRequest, PetDetailsEntity>('/api/customer/pet/create', request);
    return response.data as PetDetailsEntity;
  }

}
