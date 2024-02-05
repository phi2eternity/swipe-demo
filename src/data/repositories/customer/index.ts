import {injectable} from "inversify";
import {CustomerRepository} from "@domain/repositories/customer";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {inject} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { LoginRequest } from '@domain/types/requests/login';
import { SignupRequest } from '@domain/types/requests/signup';
import { OffsetRequest } from '@domain/types/requests/offset';
import { OffsetResponse } from '@domain/types/responses/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';
import { CustomerLocalDataSource } from '@data/datasources/customer/local-data-source';

@injectable()
export class CustomerRepositoryImpl implements CustomerRepository{

  constructor( @inject<CustomerRemoteDataSource>(CustomerRemoteDataSource) private remoteDataSource: CustomerRemoteDataSource,
    @inject<CustomerLocalDataSource>(CustomerLocalDataSource) private localDataSource: CustomerLocalDataSource){}

  async getMe(): Promise<MeResponse> {
    return this.remoteDataSource.getMe();
  }

  async login(request: LoginRequest): Promise<AuthenticationResponse> {
    return this.remoteDataSource.login(request);
  }

  async signup(request: SignupRequest): Promise<AuthenticationResponse> {
    return this.remoteDataSource.signup(request);
  }

  async upcomingAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    return this.remoteDataSource.upcomingAppointments(request);
  }

  async pastAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    return this.remoteDataSource.pastAppointments(request);
  }

  async allAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>> {
    return this.remoteDataSource.allAppointments(request);
  }

  async allPets(): Promise<PetDetailsEntity[]> {
    return this.remoteDataSource.allPets();
  }

  async createPet(request:CreatePetRequest): Promise<PetDetailsEntity> {
    return this.remoteDataSource.createPet(request);
  }

}
