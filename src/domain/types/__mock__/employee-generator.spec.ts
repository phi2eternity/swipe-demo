import {EmployeeMockGenerator} from "@domain/types/__mock__/employee-generator";

describe('EmployeeGenerator', () => {
  it('should be defined', () => {
    expect(EmployeeMockGenerator).toBeDefined();
  });

  it('should generate one', () => {
    const mockGenerator = new EmployeeMockGenerator();
    const result = mockGenerator.generateOne();
    expect(result).toBeTruthy();

  });
  it('should generate many', () => {
    const mockGenerator = new EmployeeMockGenerator();
    const result = mockGenerator.generateMany(10);
    expect(result).toBeTruthy();
    expect(result.length).toBe(10);
  });
  it('should generate valid entities.', () => {
    const mockGenerator = new EmployeeMockGenerator();
    const result = mockGenerator.generateMany(10);
    expect(result).toBeTruthy();
    expect(result.length).toBe(10);
    expect(result[0].id).toBeTruthy();
    expect(result[0].name).toBeTruthy();
    expect(result[0].email).toBeTruthy();
    expect(result[0].createdAt).toBeTruthy();
    expect(result[0].phone).toBeTruthy();
    expect(result[0].role).toBeTruthy();
  });
  it('should generate valid entity.', () => {
    const mockGenerator = new EmployeeMockGenerator();
    const result = mockGenerator.generateOne();
    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.email).toBeTruthy();
    expect(result.createdAt).toBeTruthy();
    expect(result.phone).toBeTruthy();
    expect(result.role).toBeTruthy();
  });

});
