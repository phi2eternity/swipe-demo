/*
import { injectable } from 'inversify';
import { LocalDataSource } from '@data/datasources/local-data-source';
import { CreditCardRecord } from '@domain/types/common/credit-card';


@injectable()
export abstract class PaymentLocalDataSource extends LocalDataSource{
  abstract createCreditCard(creditCard: CreditCardRecord): void;

  abstract deleteCreditCard(id: number): void;

  abstract listCreditCards(): CreditCardRecord[];
}

 */

import { inject, injectable } from 'inversify';
import { CacheProvider } from '@common/cache-provider';
import { CreditCardCacheProvider } from '@domain/types/TYPES';
import { CreditCardRecord } from '@domain/types/common/credit-card';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';

@injectable()
export class PaymentLocalDataSourceImpl implements PaymentLocalDataSource{

  constructor(@inject<CacheProvider<CreditCardRecord>>(CreditCardCacheProvider) private cacheProvider: CacheProvider<CreditCardRecord>) {}

  createCreditCard(creditCard: CreditCardRecord): Promise<void> {
    return this.cacheProvider.upsert(creditCard);
  }

  deleteCreditCard(id: number): Promise<void>  {
    return this.cacheProvider.bulkRemove([id]);
  }

  listCreditCards(): Promise<CreditCardRecord[]> {
    return this.cacheProvider.find({});
  }

  async setAll(creditCards: CreditCardRecord[]): Promise<void> {
    await this.cacheProvider.purge();
    await this.cacheProvider.bulkUpsert(creditCards);
  }


}
