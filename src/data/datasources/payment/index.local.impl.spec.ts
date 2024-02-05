import { PaymentLocalDataSourceImpl } from '@data/datasources/payment/index.local.impl';
import { Container } from 'inversify';
import { CreditCardRecord } from '@domain/types/common/credit-card';
import { CacheProvider } from '@common/cache-provider';
import { getTestContainer } from '@utils/inversion-container-test';
import { CreditCardCacheProvider } from '@domain/types/TYPES';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';
import { CreditCardRecordMockGenerator } from '@domain/types/__mock__/credit-card-record.generator';

describe('PaymentLocalDataSourceImpl', () => {
  let container: Container;
  let cacheProvider: CacheProvider<CreditCardRecord>;
  let paymentLocalDataSourceImpl: PaymentLocalDataSourceImpl;
  const generator = new CreditCardRecordMockGenerator();

  beforeAll(()=>{
    container = getTestContainer();
    cacheProvider = container.get<CacheProvider<CreditCardRecord>>(CreditCardCacheProvider);
    paymentLocalDataSourceImpl = container.get<PaymentLocalDataSource>(PaymentLocalDataSource) as PaymentLocalDataSourceImpl;
  });
  afterEach(()=>{
    jest.restoreAllMocks();
  })
  it('should be defined', () => {
    expect(PaymentLocalDataSourceImpl).toBeDefined();
    expect(paymentLocalDataSourceImpl).toBeDefined();
  });
  describe('createCreditCard', () => {
    it('should create credit card', async () => {
      const creditCard: CreditCardRecord =  generator.generateOne();
      const upsertSpy = jest.spyOn(cacheProvider, 'upsert');
      await paymentLocalDataSourceImpl.createCreditCard(creditCard);
      expect(upsertSpy).toHaveBeenCalledTimes(1);
      expect(upsertSpy).toHaveBeenCalledWith(creditCard);
    });
  });
  describe('setAll', () => {
    it('should set all',async ()=>{
      const creditCards: CreditCardRecord[] =  generator.generateMany(3);
      const purgeSpy = jest.spyOn(cacheProvider, 'purge').mockResolvedValue();
      const bulkUpsertSpy = jest.spyOn(cacheProvider, 'bulkUpsert').mockResolvedValue();
      await paymentLocalDataSourceImpl.setAll(creditCards);
      expect(purgeSpy).toHaveBeenCalledTimes(1);
      expect(bulkUpsertSpy).toHaveBeenCalledTimes(1);
      expect(bulkUpsertSpy).toHaveBeenCalledWith(creditCards);
    });
  });
  describe('listCreditCards', () => {
    it('should list credit cards', async () => {
      const creditCards: CreditCardRecord[] =  generator.generateMany(3);
      const findSpy = jest.spyOn(cacheProvider, 'find').mockResolvedValue(creditCards);
      const result = await paymentLocalDataSourceImpl.listCreditCards();
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(creditCards);
    });
  });
  describe('deleteCreditCard', () => {
    it('should delete credit card', async () => {
      const id = 1;
      const bulkRemoveSpy = jest.spyOn(cacheProvider, 'bulkRemove').mockResolvedValue();
      await paymentLocalDataSourceImpl.deleteCreditCard(id);
      expect(bulkRemoveSpy).toHaveBeenCalledTimes(1);
      expect(bulkRemoveSpy).toHaveBeenCalledWith([id]);
    });
  });
});
