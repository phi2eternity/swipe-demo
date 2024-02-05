import {injectable} from 'inversify';
import { faker } from '@faker-js/faker';
import { AppointmentEntity } from '@domain/types/common/appointment';
import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { PetMockGenerator } from '@domain/types/__mock__/pet-generator';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';
import { ProductEntity } from '@domain/types/common/product';
import { PetEntity } from '@domain/types/common/pet';

const petMockGenerator = new PetMockGenerator();
const productMockGenerator = new ProductMockGenerator();
const branchMockGenerator = new BranchMockGenerator();
const employeeMockGenerator = new EmployeeMockGenerator();


export interface GenerateAppointmentOptions {
  pets?:PetEntity[];
  products?:ProductEntity[];
  branches?:BranchEntity[];
  employees?:EmployeeEntity[];
}


export const selectRandom = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
}

const services = ["We Wash", "Grooming"];
const status = [ "Cancelled","Pending","Completed"]

@injectable()
export class AppointmentMockGenerator extends MockGenerator<AppointmentEntity> {
  generateMany(count: number,values? : GenerateAppointmentOptions ): AppointmentEntity[] {
    // Generate count elements
    return new Array(count).fill(null).map((_, id) => this.generateOne(id,values));
  }


  generateOne(id?: number,values? : GenerateAppointmentOptions ): AppointmentEntity {

    const func = (faker.datatype.boolean()) ? faker.date.past : faker.date.future;
    const start = func();
    const end = func();

    return {
      id: id ?? faker.datatype.number(),
      start: start.toString(),
      end: end.toString(),
      customer_notes: faker.lorem.paragraph(),
      tip: faker.datatype.number(),
      cost: faker.datatype.number(),
      status: selectRandom(status),
      appointment_type: selectRandom(services) ,
      products: (values?.products) ? selectRandom((values as GenerateAppointmentOptions).products as ProductEntity[]):  productMockGenerator.generateMany(faker.datatype.number({
        min: 0,
        max:5
      })),
      branch: (values?.branches) ? selectRandom((values as GenerateAppointmentOptions).branches as BranchEntity[]):  branchMockGenerator.generateOne(),
      employee: (values?.employees) ? selectRandom((values as GenerateAppointmentOptions).employees as EmployeeEntity[]):  employeeMockGenerator.generateOne(),
      pet: (values?.pets) ? selectRandom((values as GenerateAppointmentOptions).pets as PetEntity[]):  petMockGenerator.generateOne(),
    } as AppointmentEntity;
  }
}
