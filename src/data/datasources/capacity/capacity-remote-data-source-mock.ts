import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";
import {injectable} from "inversify";

@injectable()
export class CapacityRemoteDataSourceMock extends CapacityRemoteDataSource {
  getMonthlyCapacity(monthlyCapacityRequest: MonthlyCapacityRequest): Promise<MonthlyCapacityResponse> {

    const {date} = monthlyCapacityRequest;
    // mm/yyyy
    const [month, year] = date.split("/");
    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);
    const startOfMonth = new Date(yearNumber, monthNumber - 1, 1);
    const endOfMonth = new Date(yearNumber, monthNumber, 0);
    // Iterate from start of month to end of month
    const response: MonthlyCapacityResponse = []
    while (startOfMonth <= endOfMonth) {
      // Do something with startOfMonth
      response.push({
        // YYYY-MM-DD
        date: startOfMonth.toISOString().split("T")[0],
        morning_capacity: Math.random(),
        afternoon_capacity: Math.random(),
      })
      startOfMonth.setDate(startOfMonth.getDate() + 1);

    }
    return Promise.resolve(response);
  }
}
