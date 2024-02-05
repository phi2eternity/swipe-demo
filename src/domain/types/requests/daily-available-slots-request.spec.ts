import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";

describe('DailySlotsRequest', () => {
  it('should be valid without employees,branch and duration.', () => {
    const dailySlotsRequest: DailyAvailableSlotsRequest = {
      service: 'We Wash', date: '2020-01-01',
    };
    expect(dailySlotsRequest).toBeDefined();

  });

  it('should be valid without employees and branch.', () => {
    const dailySlotsRequest: DailyAvailableSlotsRequest = {
      service: 'We Wash', date: '2020-01-01', duration: 30,
    };
    expect(dailySlotsRequest).toBeDefined();
  });
  it('should be valid when all fields are given correctly.', () => {
    const dailySlotsRequest: DailyAvailableSlotsRequest = {
      service: 'We Wash', date: '2020-01-01', duration: 30, employees: [1, 2, 3], branches: [1, 2, 3],

    };
    expect(dailySlotsRequest).toBeDefined();
  });

  it('should be valid when empty arrays are given.', () => {
    const dailySlotsRequest: DailyAvailableSlotsRequest = {
      service: 'We Wash', date: '2020-01-01', duration: 30, employees: [], branches: [],
    };
    expect(dailySlotsRequest).toBeDefined();
  });
});
