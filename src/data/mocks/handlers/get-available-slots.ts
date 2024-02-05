import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {rest} from "msw";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {BranchEntity} from "@domain/types/common/branch";
import {EmployeeEntity} from "@domain/types/common/employee";


export const generateAvailableSlotsResponse = (date: Date): DailyAvailableSlotsResponse => {

  const response = [];
  const randomLength = Math.floor(Math.random() * 50) +1;

  for (let i = 0; i < randomLength; i++) {
    const start = `${date}T${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00.000Z`;
    const end = `${date}T${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:00.000Z`;
    const employeeId = Math.floor(Math.random() * 10);
    const branchId = Math.floor(Math.random() * 10);
    const branch = {
      id: branchId,
      name: `Branch ${branchId}`,
      address: `Address ${branchId}`,
      phone: `Phone ${branchId}`,
      email: `Email ${branchId}`,

    } as BranchEntity;

    const employee = {
      id: employeeId,
      name: `Employee ${employeeId}`,

    } as EmployeeEntity;

    response.push({
      start, end, employee, branch,
    });
  }
  return response as DailyAvailableSlotsResponse;
}

export const getAvailableSlotsHandler = rest.post(/\/api\/available\/daily/, (req, res, ctx) => {
  const {date} = req.body as MonthlyCapacityRequest;


  const dateObj = new Date(date);
  const response = generateAvailableSlotsResponse(dateObj);

  return res(ctx.status(200), ctx.json(response),);

});
