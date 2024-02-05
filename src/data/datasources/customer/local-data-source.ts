import { injectable } from 'inversify';
import { MeResponse } from '@domain/types/responses/me-response';
import { OffsetRequest } from '@domain/types/requests/offset';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { OffsetResponse } from '@domain/types/responses/offset';
import { PetDetailsEntity } from '@domain/types/common/pet-details';


@injectable()
export abstract class CustomerLocalDataSource {

  abstract me(value? : MeResponse): Promise<MeResponse | null>;

  abstract upcomingAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract pastAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract allAppointments(request:OffsetRequest): Promise<OffsetResponse<AppointmentEntity>>;

  abstract allPets(): Promise<PetDetailsEntity[]>;

  abstract createPet(request:PetDetailsEntity): Promise<void>;

  abstract addAppointments(request:AppointmentEntity[]): Promise<void>;

  abstract addPets(request:PetDetailsEntity[]): Promise<void>;
}
