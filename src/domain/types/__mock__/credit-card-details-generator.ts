import { CreditCardDetails } from '@domain/types/common/credit-card-details';
import { injectable } from 'inversify';
import { MockGenerator } from '@domain/types/__mock__/mock-generator';
import { faker } from '@faker-js/faker';


@injectable()
export class CreditCardDetailsMockGenerator extends MockGenerator<CreditCardDetails>{

  generateMany(count: number): CreditCardDetails[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): CreditCardDetails {
    const expiredDate = faker.date.future(5);
    // 09/2024
    const expiredDateStr = `${expiredDate.getMonth() + 1}/${expiredDate.getFullYear()}`;
    return {
      cardNumber: faker.finance.creditCardNumber('################'),
      cvv: faker.finance.creditCardCVV(),
      expiredDate: expiredDateStr,
      issuer: faker.finance.creditCardIssuer()
    } as CreditCardDetails;
  }
}
