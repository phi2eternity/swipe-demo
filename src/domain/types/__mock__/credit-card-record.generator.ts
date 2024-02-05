import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { CreditCardRecord } from '@domain/types/common/credit-card';
import {faker} from '@faker-js/faker';

export class CreditCardRecordMockGenerator implements MockGenerator<CreditCardRecord>{
  generateMany(N: number): CreditCardRecord[] {
    return new Array(N).fill(null).map(() => this.generateOne());
  }

  generateOne(): CreditCardRecord {
    return {
      id: faker.datatype.number({min:0,max:100000}),
      exp_month: faker.date.future(5).getMonth().toString(),
      exp_year: faker.date.future(5).getFullYear().toString(),
      first6: faker.finance.creditCardNumber('######'),
      last4: faker.finance.creditCardNumber('####'),
      brand: faker.finance.creditCardIssuer()
    }
  }

}
