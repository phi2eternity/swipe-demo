import { PetEntity } from '@domain/types/common/pet';
import { ProductEntity } from '@domain/types/common/product';
import { BranchEntity } from '@domain/types/common/branch';
import { EmployeeEntity } from '@domain/types/common/employee';

export interface AppointmentEntity {
  id: number;
  pet: PetEntity;
  start: string;
  end: string;
  customer_notes: string;
  tip: number;
  cost: number;
  products: ProductEntity[];
  branch: BranchEntity;
  employee: EmployeeEntity;
  status: string;
  appointment_type: string;
}
