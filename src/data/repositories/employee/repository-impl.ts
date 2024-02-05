import {EmployeeRepository} from "@domain/repositories/employee/repository";
import {EmployeeRemoteDataSource} from "@data/datasources/employee/remote-data-source";

import {inject, injectable} from "inversify";

import {EmployeeEntity, EmployeeFilter} from "@domain/types/common/employee";

@injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {

    constructor(@inject(EmployeeRemoteDataSource) private remoteDataSource: EmployeeRemoteDataSource) {
      this.remoteDataSource = remoteDataSource;
    }

    async getEmployees(filter: EmployeeFilter): Promise<EmployeeEntity[]> {
      return await this.remoteDataSource.getEmployees(filter);
    }

}
