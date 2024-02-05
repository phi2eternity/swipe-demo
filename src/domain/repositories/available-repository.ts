import {injectable} from "inversify";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";

@injectable()
export abstract class AvailableRepository {

  abstract getDailySlots(body: DailyAvailableSlotsRequest): Promise<DailyAvailableSlotsResponse>;
}

