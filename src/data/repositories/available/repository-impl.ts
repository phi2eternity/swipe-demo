import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {inject, injectable} from "inversify";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";

@injectable()
export class AvailableRepositoryImpl implements AvailableRepository {

  constructor(@inject(AvailableRemoteDataSource) private remoteDataSource: AvailableRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getDailySlots(monthlyCapacityRequest: DailyAvailableSlotsRequest): Promise<DailyAvailableSlotsResponse> {
    return await this.remoteDataSource.getDailySlots(monthlyCapacityRequest);
  }

}
