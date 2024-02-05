
import { AppointmentEntity } from '@domain/types/common/appointment';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';

describe('AppointmentEntity', () => {

  const productGenerator = new ProductMockGenerator();
  const petGenerator = new PetMockGenerator();
  const branchGenerator = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();

  it('should create an instance', () => {
    const appointmentEntity: AppointmentEntity = {
      id: 1,
      pet: petGenerator.generateOne(),
      start: '2020-01-01',
      end: '2020-01-01',
      customer_notes: 'notes',
      tip: 1,
      cost: 1,
      products: productGenerator.generateMany(2),
      branch: branchGenerator.generateOne(),
      employee: employeeGenerator.generateOne(),
      status: 'status',
      appointment_type: 'type',
    };
    expect(appointmentEntity).toBeDefined();
  });
});
