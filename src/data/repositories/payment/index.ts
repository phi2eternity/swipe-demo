import { inject, injectable } from 'inversify';
import { PaymentRepository } from '@domain/repositories/payment';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';

@injectable()
export class PaymentRepositoryImpl implements PaymentRepository{
  constructor(
    @inject(PaymentRemoteDataSource) private paymentRemoteDataSource: PaymentRemoteDataSource,
    @inject(PaymentLocalDataSource) private paymentLocalDataSource: PaymentLocalDataSource
    ) {
  }

  async addCreditCard(creditCard: CreditCardInformation): Promise<CreditCardRecord> {
    return await this.paymentRemoteDataSource.addCreditCard(creditCard);
  }

  async deleteCreditCard(id: number): Promise<void> {
    await this.paymentRemoteDataSource.deleteCreditCard(id);
  }

  async listCreditCards(): Promise<CreditCardRecord[]> {
    return this.paymentRemoteDataSource.listCreditCards();
  }
}
