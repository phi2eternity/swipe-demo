import { RemoteDataSource } from '@data/datasources/remote-data-source';
import { injectable } from 'inversify';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';


@injectable()
export abstract class PaymentRemoteDataSource extends RemoteDataSource{
  abstract listCreditCards() : Promise<CreditCardRecord[]>
  abstract addCreditCard(creditCard:CreditCardInformation) : Promise<CreditCardRecord>
  abstract deleteCreditCard(id:number) : Promise<void>
}
