import {injectable} from "inversify";
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import {EmployeeEntity} from "@domain/types/common/employee";
import {faker} from "@faker-js/faker";

@injectable()
export class EmployeeMockGenerator extends MockGenerator<EmployeeEntity>{
  generateMany(count: number): EmployeeEntity[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): EmployeeEntity {
    return {
      id: faker.datatype.number(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      createdAt: faker.date.past().toString(),
      phone: faker.phone.number(),
      role: faker.name.jobTitle(),

    } as EmployeeEntity;
  }


}
