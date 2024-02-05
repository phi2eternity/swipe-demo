import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {EmployeeEntity} from "@domain/types/common/employee";
import {BranchEntity} from "@domain/types/common/branch";

describe('DailyAvailableSlotsResponse', () => {
  it('should include all fields.', () => {
    const employee = {
      id: 3,
      name: `Employee 3`,

    } as EmployeeEntity;

    const branch = {
      id: 3,
      name: `Branch 3`,
      address: `Address 3`,
      phone: `Phone 3`,
      email: `Email 3`,
    } as BranchEntity;

    const dailyAvailableSlotsResponse: DailyAvailableSlotsResponse = [
      {
        start: '08:00',
        end: '08:30',
        employee,
        branch,
      },
      {
        start: '08:30',
        end: '09:00',
        employee,
        branch,
      }
    ];

    expect(dailyAvailableSlotsResponse).toBeDefined();
  });
});
