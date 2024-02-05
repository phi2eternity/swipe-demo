import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {inject, injectable} from "inversify";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {HttpClient} from "@quicker/common/http-client";
import {HttpClientSymbol} from "@domain/types/TYPES";

@injectable()
export class AvailableRemoteDataSourceImpl implements AvailableRemoteDataSource {
  constructor(@inject<HttpClient>(HttpClientSymbol) private client: HttpClient) {
    this.client = client;
  }

  async getDailySlots(body: DailyAvailableSlotsRequest): Promise<DailyAvailableSlotsResponse> {
    const response = await this.client.post<DailyAvailableSlotsRequest, DailyAvailableSlotsResponse>('/api/available/daily', body);
    return response.data as DailyAvailableSlotsResponse;
  }
}
