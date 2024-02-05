import {injectable} from "inversify";
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import {MeResponse} from "@domain/types/responses/me-response";
import { faker } from '@faker-js/faker';

@injectable()
export class MeMockGenerator extends MockGenerator<MeResponse>{
  generateMany(count: number): MeResponse[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): MeResponse {
    return {
      id: faker.datatype.number(),
      lifetime_tips: faker.datatype.number(),
      lifetime_product_sales: faker.datatype.number(),
      lifetime_service_sales: faker.datatype.number(),
      dogs: [],
      created_at: faker.date.past().toString(),
      updated_at: faker.date.past().toString(),
      name: faker.name.firstName(),
      uid: faker.datatype.uuid(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
      role: faker.datatype.number(),
      user: faker.datatype.number(),
    } as MeResponse;
  }
}
