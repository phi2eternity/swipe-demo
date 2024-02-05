import {BranchEntity} from "@domain/types/common/branch";
import {injectable} from "inversify";
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import {faker} from "@faker-js/faker";


@injectable()
export class BranchMockGenerator extends MockGenerator<BranchEntity> {
  generateMany(count: number): BranchEntity[] {
    // Generate count elements
    return new Array(count).fill(null).map((_, id) => this.generateOne(id));
  }

  generateOne(id?:number): BranchEntity {
    return {
      id: id ?? faker.datatype.number(),
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      address: faker.address.secondaryAddress(),
      createdAt: faker.date.past().toString(),
      updatedAt: faker.date.past().toString(),
      email: faker.internet.email(),
      phone:faker.phone.number()

    } as BranchEntity;
  }



}
