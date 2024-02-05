import {RemoteDataSource} from "@data/datasources/remote-data-source";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {injectable} from "inversify";

@injectable()
export abstract class CapacityRemoteDataSource extends RemoteDataSource {
  abstract getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse>;
}

