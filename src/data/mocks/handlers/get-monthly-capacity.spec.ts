import {
  getMonthlyCapacityResponse,
  setAfternoonCapacity,
  setMorningCapacity
} from "@data/mocks/handlers/get-monthly-capacity";

describe('getMonthlyCapacityHandler', () => {
  it('should return a list of capacity for the given month', async () => {
    const date = new Date();
    const response = getMonthlyCapacityResponse(date);
    expect(response.length).toBeGreaterThan(0);
    const firstDay = response[0];
    expect(firstDay.date).toEqual(`${1}-${date.getMonth() + 1}-${date.getFullYear()}`);
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    expect(response.length).toEqual(totalDays);
    const lastDay = response[response.length - 1];
    expect(lastDay.date).toEqual(`${totalDays}-${date.getMonth() + 1}-${date.getFullYear()}`);
  });

  it('should return a list of capacity for the given month with given afternoonCapacity', async () => {
    const date = new Date();
    const afternoonCapacity = 0.5;
    setAfternoonCapacity(afternoonCapacity);
    const response = getMonthlyCapacityResponse(date);
    expect(response.length).toBeGreaterThan(0);
    for(const day of response) {
      expect(day.afternoon_capacity).toEqual(afternoonCapacity);
    }
  });

  it('should return a list of capacity for the given month with given morningCapacity', async () => {
    const date = new Date();
    const morningCapacity = 0.75;
    setMorningCapacity(morningCapacity);
    const response = getMonthlyCapacityResponse(date);
    expect(response.length).toBeGreaterThan(0);
    for(const day of response) {
      expect(day.morning_capacity).toEqual(morningCapacity);
    }
  });

  it('should return a list of capacity for the given month with given morningCapacity and afternoonCapacity', async () => {
    const date = new Date();
    const morningCapacity = 0.1;
    const afternoonCapacity = 0.9;
    setMorningCapacity(morningCapacity);
    setAfternoonCapacity(afternoonCapacity);
    const response = getMonthlyCapacityResponse(date);
    expect(response.length).toBeGreaterThan(0);
    for(const day of response) {
      expect(day.morning_capacity).toEqual(morningCapacity);
      expect(day.afternoon_capacity).toEqual(afternoonCapacity);
    }
  });
});
