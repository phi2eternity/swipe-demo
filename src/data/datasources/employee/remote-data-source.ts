import {injectable} from "inversify";
import {EmployeeEntity, EmployeeFilter} from "@domain/types/common/employee";


@injectable()
export abstract class EmployeeRemoteDataSource {
  abstract getEmployees(filter: EmployeeFilter): Promise<EmployeeEntity[]>;
}
