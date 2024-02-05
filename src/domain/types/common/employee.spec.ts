import {EmployeeEntity} from "@domain/types/common/employee";

describe('EmployeeEntity',() => {
  it('should be defined', () => {
    const employee = {
      id: 1,
      createdAt: '2020-01-01',
      name: 'employee 1',
      email: '',
      phone: '123-456-7890',
      role: 'employee',
    } as EmployeeEntity;
    expect(employee).toBeDefined();
  });
});
