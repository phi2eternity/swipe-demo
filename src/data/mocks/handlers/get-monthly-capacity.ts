import {rest} from "msw";
import {MonthlyCapacityRequest} from "@domain/types/requests/monthly-capacity-request";
import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";

let morningCapacity = -1;
let afternoonCapacity = -1;

export const setMorningCapacity = (value: number) => {
  morningCapacity = value;
}

export const setAfternoonCapacity = (value: number) => {
  afternoonCapacity = value;
}

export const getMonthlyCapacityResponse = (dateObj: Date): MonthlyCapacityResponse => {
  const startOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
  const endOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);

  const response = [];
  for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
    response.push({
      date: `${i}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`,
      afternoon_capacity: (afternoonCapacity == -1) ? Math.random() : afternoonCapacity,
      morning_capacity: (morningCapacity == -1) ? Math.random() : morningCapacity,
    });
  }
  return response as MonthlyCapacityResponse;
}


export const getMonthlyCapacityHandler = rest.post(/\/api\/schedule\/capacity\/monthly/, (req, res, ctx) => {
  const {date} = req.body as MonthlyCapacityRequest;

  const dateObj = new Date(date);
  const response = getMonthlyCapacityResponse(dateObj);

  return res(ctx.status(200), ctx.json(response),);
});
