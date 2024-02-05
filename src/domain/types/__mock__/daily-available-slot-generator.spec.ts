import { DailyAvailableSlotMockGenerator } from '@domain/types/__mock__/daily-available-slot-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';


describe('DailyAvailableSlotMockGenerator', () => {

  const employeeMockGenerator = new EmployeeMockGenerator();
  const branchMockGenerator = new BranchMockGenerator();

  it('should generate one', () => {
    const generator = new DailyAvailableSlotMockGenerator();
    const result = generator.generateOne();
    expect(result).toBeDefined();
  });

  it('should generate many', () => {
    const generator = new DailyAvailableSlotMockGenerator();
    const result = generator.generateMany(5);
    expect(result).toBeDefined();
    expect(result.length).toBe(5);
  });
  it('should generate many with branches and employees', () => {
    const generator = new DailyAvailableSlotMockGenerator();
    const employees = employeeMockGenerator.generateMany(5);
    const branches = branchMockGenerator.generateMany(5);
    const result = generator.generateMany(5, {employees,branches});
    expect(result).toBeDefined();
    expect(result.length).toBe(5);
    for (const item of result) {
      expect(item.employee).toBeDefined();
      expect(item.branch).toBeDefined();
      expect(branches).toContain(item.branch);
      expect(employees).toContain(item.employee);
    }
  });

  it('should generate one with branches and employees', () => {
    const generator = new DailyAvailableSlotMockGenerator();
    const employees = employeeMockGenerator.generateMany(5);
    const branches = branchMockGenerator.generateMany(5);
    const result = generator.generateOne({employees,branches});
    expect(result).toBeDefined();
    expect(branches).toContain(result.branch);
    expect(employees).toContain(result.employee);
  });
});
