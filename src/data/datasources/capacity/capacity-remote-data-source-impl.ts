import { MonthlyCapacityResponse } from "@domain/types/responses/monthly-capacity-response";
import { MonthlyCapacityRequest } from "@domain/types/requests/monthly-capacity-request";
import { CapacityRemoteDataSource } from "@data/datasources/capacity/capacity-remote-data-source";
import { inject, injectable } from "inversify";
import { HttpClient} from "@quicker/common/http-client";
import {HttpClientSymbol} from "@domain/types/TYPES";

@injectable()
export class CapacityRemoteDataSourceImpl implements CapacityRemoteDataSource {
  constructor(
    @inject<HttpClient>(HttpClientSymbol) private client: HttpClient
  ) {
    this.client = client;
  }

  async getMonthlyCapacity(
    body: MonthlyCapacityRequest
  ): Promise<MonthlyCapacityResponse> {
    const response = await this.client.post<
      MonthlyCapacityRequest,
      MonthlyCapacityResponse
    >("/api/capacity/monthly", body);
    return response.data as MonthlyCapacityResponse;
  }
}
