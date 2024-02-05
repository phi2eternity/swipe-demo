import {inject, injectable} from "inversify";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {UseCase} from "@quicker/common/use-case";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";


export interface GetAvailableSlotsParams extends MonthlyCapacityRequest {
}

@injectable()
export class GetAvailableSlotsUseCase implements UseCase<GetAvailableSlotsParams,Promise<DailyAvailableSlotsResponse>> {
  constructor(
    @inject(AvailableRepository) private readonly repository: AvailableRepository,
  ) {
  }

  async call(params: GetAvailableSlotsParams): Promise<DailyAvailableSlotsResponse> {
    return await this.repository.getDailySlots(params as DailyAvailableSlotsRequest);
  }
}
