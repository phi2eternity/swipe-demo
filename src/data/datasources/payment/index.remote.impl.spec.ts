import { PaymentRemoteDataSourceImpl } from '@data/datasources/payment/index.remote.impl';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import mockAxios from 'jest-mock-axios';
import { mock } from 'jest-mock-extended';

describe('PaymentRemoteDataSourceImpl', () => {

  let container :Container;
  let paymentRemoteDataSourceImpl: PaymentRemoteDataSourceImpl;
  beforeAll(()=>{
    container = getTestContainer();
    paymentRemoteDataSourceImpl = container.get(PaymentRemoteDataSource) as PaymentRemoteDataSourceImpl;
  })

  it('should be defined', () => {
    expect(paymentRemoteDataSourceImpl).toBeDefined();
  });

  it('should post to /payment/create-card', async () => {
    const creditCardRecord = mock<CreditCardRecord>();
    mockAxios.post.mockResolvedValueOnce({data:creditCardRecord});
    const creditCardInformation = mock<CreditCardInformation>();
    const response = await paymentRemoteDataSourceImpl.addCreditCard(creditCardInformation);
    expect(mockAxios.post).toHaveBeenCalledWith('/payment/create-card', creditCardInformation,undefined);
    expect(response).toEqual(creditCardRecord);
  });
  it('should delete to /payment/card/:id', async () => {
    mockAxios.delete.mockResolvedValueOnce({});
    const id = 1;
    await paymentRemoteDataSourceImpl.deleteCreditCard(id);
    expect(mockAxios.delete).toHaveBeenCalledWith(`/payment/card/${id}`,undefined);
  });
  it('should get to /payment/cards', async () => {
    const creditCardRecords = mock<CreditCardRecord[]>();
    mockAxios.get.mockResolvedValueOnce({data:creditCardRecords});
    const response = await paymentRemoteDataSourceImpl.listCreditCards();
    expect(mockAxios.get).toHaveBeenCalledWith('/payment/cards',undefined);
    expect(response).toEqual(creditCardRecords);
  });
});
