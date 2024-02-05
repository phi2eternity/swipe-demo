import {injectable} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import {RemoteDataSource} from "@data/datasources/remote-data-source";
import { LoginRequest } from '@domain/types/requests/login';
import { AuthenticationResponse } from '@domain/types/responses/authentication';
import { SignupRequest } from '@domain/types/requests/signup';
import { OffsetRequest } from '@domain/types/requests/offset';
import { OffsetResponse } from '@domain/types/responses/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { PetDetailsEntity } from '@domain/types/common/pet-details';
import { CreatePetRequest } from '@domain/types/requests/create-pet';



@injectable()
export abstract class CustomerRemoteDataSource extends RemoteDataSource {
  abstract getMe(): Promise<MeResponse>;

  abstract login(request: LoginRequest): Promise<AuthenticationResponse>;

  abstract signup(request: SignupRequest): Promise<AuthenticationResponse>;

  abstract upcomingAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract pastAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract allAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract allPets(): Promise<PetDetailsEntity[]>;

  abstract createPet(request:CreatePetRequest): Promise<PetDetailsEntity>;

}
