import { injectable } from 'inversify';
import { LocalDataSource } from '@data/datasources/local-data-source';
import { CreditCardRecord } from '@domain/types/common/credit-card';


@injectable()
export abstract class PaymentLocalDataSource extends LocalDataSource{
  abstract createCreditCard(creditCard: CreditCardRecord): Promise<void>;

  abstract deleteCreditCard(id: number): Promise<void>;

  abstract listCreditCards(): Promise<CreditCardRecord[]>;

  abstract setAll(creditCards: CreditCardRecord[]): Promise<void>;
}
