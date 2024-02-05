import {MonthlyCapacityRequest} from '@domain/types/requests/monthly-capacity-request';

describe('MonthlyCapacityRequest', () => {
  it(' should be defined.', () => {
    // Check if it is a valid type
    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      employees: [1, 2, 3],
      branches: [1, 2, 3],
      service: 'service',
      date: '2020-01-01',
    };
    expect(monthlyCapacityRequest).toBeDefined();
  });

  it('should be defined w/o employees.', () => {
    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      branches: [1, 2, 3],
      service: 'service',
      date: '2020-01-01',
    }
    expect(monthlyCapacityRequest).toBeDefined();
  });

  it('should be defined w/o branches.', () => {
    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      employees: [1, 2, 3],
      service: 'service',
      date: '2020-01-01',
    };
    expect(monthlyCapacityRequest).toBeDefined();
  });

  it('should be defined w/o employees and branches.', () => {
    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      service: 'service',
      date: '2020-01-01',
    };
    expect(monthlyCapacityRequest).toBeDefined();

  });
});
