import { inject, injectable } from 'inversify';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { HttpClient } from '@common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';

@injectable()
export class PaymentRemoteDataSourceImpl implements PaymentRemoteDataSource{
  constructor(@inject<HttpClient>(HttpClientSymbol) private httpClient: HttpClient) {
  }

  async addCreditCard(creditCard:CreditCardInformation): Promise<CreditCardRecord> {
    const response = await this.httpClient.post('/payment/create-card', creditCard);
    return response.data;
  }

  async deleteCreditCard(id:number): Promise<void> {
    await this.httpClient.delete(`/payment/card/${id}`);
  }

  async listCreditCards(): Promise<CreditCardRecord[]> {
    const response = await this.httpClient.get('/payment/cards');
    return response.data;
  }

}
