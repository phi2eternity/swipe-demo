import {MonthlyCapacityResponse} from "@domain/types/responses/monthly-capacity-response";

describe('MonthlyCapacityResponse', () => {
  it('should be defined empty.', () => {
    const monthlyCapacityResponse: MonthlyCapacityResponse = [];
    expect(monthlyCapacityResponse).toBeDefined();
  });
  it('should be defined.', () => {
    const monthlyCapacityResponse: MonthlyCapacityResponse = [
      {date: '2020-01-01', morning_capacity: 1, afternoon_capacity: 2},
      {date: '2020-01-02', morning_capacity: 1, afternoon_capacity: 2},
      {date: '2020-01-03', morning_capacity: 1, afternoon_capacity: 2},
    ];
    expect(monthlyCapacityResponse).toBeDefined();
  });

});
