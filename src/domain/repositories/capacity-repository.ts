import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {injectable} from "inversify";

@injectable()
export abstract class CapacityRepository {

  abstract getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse>;
}

