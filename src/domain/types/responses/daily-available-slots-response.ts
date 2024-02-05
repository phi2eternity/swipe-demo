import {EmployeeEntity} from "@domain/types/common/employee";
import {BranchEntity} from "@domain/types/common/branch";

export interface DailyAvailableSlot {
  start: string;
  end: string;
  employee: EmployeeEntity;
  branch: BranchEntity;
}

export type  DailyAvailableSlotsResponse = DailyAvailableSlot[];
