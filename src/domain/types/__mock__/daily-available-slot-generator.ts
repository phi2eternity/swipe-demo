import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import {injectable} from "inversify";
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import {faker} from "@faker-js/faker";
import {EmployeeMockGenerator} from "@domain/types/__mock__/employee-generator";
import {BranchMockGenerator} from "@domain/types/__mock__/branch-generator";
import { GenerateAppointmentOptions, selectRandom } from '@domain/types/__mock__/appointment';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';


export interface GenerateDailyAvailableSlotOptions {
  employees?: EmployeeEntity[];
  branches?: BranchEntity[];
}


@injectable()
export class DailyAvailableSlotMockGenerator extends MockGenerator<DailyAvailableSlot>{
  private employeeMockGenerator: EmployeeMockGenerator = new EmployeeMockGenerator();
  private branchMockGenerator: BranchMockGenerator = new BranchMockGenerator();

  generateMany(count: number,values? : GenerateDailyAvailableSlotOptions ): DailyAvailableSlot[] {
    return new Array(count).fill(null).map(() => this.generateOne(values));
  }
  generateOne(values? : GenerateDailyAvailableSlotOptions ): DailyAvailableSlot {
    const baseDate = faker.date.past();
    const startTime = faker.datatype.number({ min: 0, max: 21 });
    const endTime = faker.datatype.number({ min: startTime + 1, max: 23 });

    const start = new Date(baseDate);
    start.setHours(startTime, 0, 0, 0);

    const end = new Date(baseDate);
    end.setHours(endTime, 0, 0, 0);

    return {
      start: start.toString(),
      end: end.toString(),
      branch: (values?.branches) ? selectRandom((values as GenerateAppointmentOptions).branches as BranchEntity[]):  this.branchMockGenerator.generateOne(),
      employee: (values?.employees) ? selectRandom((values as GenerateAppointmentOptions).employees as EmployeeEntity[]):  this.employeeMockGenerator.generateOne(),
    } as DailyAvailableSlot;
  }

}
