import {inject, injectable} from "inversify";
import {EmployeeRemoteDataSource} from "@data/datasources/employee/remote-data-source";
import {EmployeeEntity, EmployeeFilter} from "@domain/types/common/employee";
import {HttpClient} from "@quicker/common/http-client";
import {HttpClientSymbol} from "@domain/types/TYPES";

@injectable()
export class EmployeeRemoteDataSourceImpl implements EmployeeRemoteDataSource {

  constructor(@inject<HttpClient>(HttpClientSymbol) private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getEmployees(params: EmployeeFilter): Promise<EmployeeEntity[]> {

    if (!params.role) {
      params["role"] = "15";
    }
    const response = await this.httpClient.get<EmployeeEntity[]>('/api/employees', {
      params
    });
    return response.data;

  }

}
