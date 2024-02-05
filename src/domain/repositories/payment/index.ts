import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { injectable } from 'inversify';

@injectable()
export abstract class PaymentRepository{
  abstract listCreditCards() : Promise<CreditCardRecord[]>
  abstract addCreditCard(creditCard:CreditCardInformation) : Promise<CreditCardRecord>
  abstract deleteCreditCard(id:number) : Promise<void>
}
