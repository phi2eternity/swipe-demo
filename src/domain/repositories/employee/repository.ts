import {injectable} from "inversify";
import {EmployeeEntity, EmployeeFilter} from "@domain/types/common/employee";




@injectable()
export abstract class EmployeeRepository {

  abstract getEmployees(query : EmployeeFilter) : Promise<EmployeeEntity[]>;

}
