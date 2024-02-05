import { PaymentRepositoryImpl } from '@data/repositories/payment/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { mock } from 'jest-mock-extended';
import { PaymentRepository } from '@domain/repositories/payment';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';

describe('PaymentRepositoryImpl', () => {
  let paymentRepositoryImpl: PaymentRepositoryImpl;
  let container : Container;
  let paymentRemoteDataSource : PaymentRemoteDataSource;
  let paymentLocalDataSource : PaymentLocalDataSource;

  beforeAll(()=>{
    container = getTestContainer();
    paymentRepositoryImpl = container.get(PaymentRepository) as PaymentRepositoryImpl;
    paymentRemoteDataSource = container.get(PaymentRemoteDataSource);
    paymentLocalDataSource = container.get(PaymentLocalDataSource);
  });
  beforeEach(()=>{
    jest.resetAllMocks();
  });
  it('should be defined', () => {
    expect(PaymentRepositoryImpl).toBeDefined();
    expect(paymentRepositoryImpl).toBeDefined();
  });
  describe('addCreditCard', () => {
    it('should add credit card', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'addCreditCard');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'createCreditCard');
      jest.spyOn(paymentLocalDataSource, 'createCreditCard');
      const creditCardInformation = mock<CreditCardInformation>();
      const creditCardRecord = mock<CreditCardRecord>();
      remoteSpy.mockResolvedValue(creditCardRecord);
      localSpy.mockResolvedValue();
      const result = await paymentRepositoryImpl.addCreditCard(creditCardInformation);
      expect(result).toBe(creditCardRecord);
      expect(paymentRemoteDataSource.addCreditCard).toBeCalledWith(creditCardInformation);
      expect(paymentLocalDataSource.createCreditCard).toBeCalledWith(creditCardRecord);
    });
    it('should throw error if remote fails', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'addCreditCard');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'createCreditCard');
      jest.spyOn(paymentLocalDataSource, 'createCreditCard');
      const creditCardInformation = mock<CreditCardInformation>();
      const creditCardRecord = mock<CreditCardRecord>();
      remoteSpy.mockRejectedValue(new Error('Error adding credit card'));
      localSpy.mockResolvedValue();
      await expect(paymentRepositoryImpl.addCreditCard(creditCardInformation)).rejects.toThrowError('Error adding credit card');
      expect(paymentRemoteDataSource.addCreditCard).toBeCalledWith(creditCardInformation);
      expect(paymentLocalDataSource.createCreditCard).not.toBeCalled();
    });
  });
  describe('deleteCreditCard', () => {
    it('should delete credit card', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'deleteCreditCard');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'deleteCreditCard');
      const id = 1;
      remoteSpy.mockResolvedValue();
      localSpy.mockResolvedValue();
      await paymentRepositoryImpl.deleteCreditCard(id);
      expect(paymentRemoteDataSource.deleteCreditCard).toBeCalledWith(id);
      expect(paymentLocalDataSource.deleteCreditCard).toBeCalledWith(id);
    });
    it('should throw error if remote fails', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'deleteCreditCard');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'deleteCreditCard');
      const id = 1;
      remoteSpy.mockRejectedValue(new Error('Error deleting credit card with id: ' + id + ''));
      localSpy.mockResolvedValue();
      await expect(paymentRepositoryImpl.deleteCreditCard(id)).rejects.toThrowError('Error deleting credit card with id: ' + id + '');
      expect(paymentRemoteDataSource.deleteCreditCard).toBeCalledWith(id);
      expect(paymentLocalDataSource.deleteCreditCard).not.toBeCalled();
    });
  });
  describe('listCreditCards', () => {
    it('should call remote data source if local data source is empty and sets local data source', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'listCreditCards');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'listCreditCards');
      const setAllSpy = jest.spyOn(paymentLocalDataSource, 'setAll');
      remoteSpy.mockResolvedValue([]);
      localSpy.mockResolvedValue([]);
      const result = await paymentRepositoryImpl.listCreditCards();
      expect(result).toEqual([]);
      expect(paymentRemoteDataSource.listCreditCards).toBeCalled();
      expect(paymentLocalDataSource.listCreditCards).toBeCalled();
      expect(paymentLocalDataSource.setAll).toBeCalled();
    });
    it('should call remote data source if local data source is not empty and sets local data source, but returns local data source results', async () => {
      const remoteSpy = jest.spyOn(paymentRemoteDataSource, 'listCreditCards');
      const localSpy = jest.spyOn(paymentLocalDataSource, 'listCreditCards');
      const setAllSpy = jest.spyOn(paymentLocalDataSource, 'setAll');
      remoteSpy.mockResolvedValue([]);
      const localData = [mock<CreditCardRecord>()];
      localSpy.mockResolvedValue(localData);
      const result = await paymentRepositoryImpl.listCreditCards();
      expect(result).toEqual(localData);
      expect(paymentRemoteDataSource.listCreditCards).toBeCalled();
      expect(paymentLocalDataSource.listCreditCards).toBeCalled();
      expect(paymentLocalDataSource.setAll).toBeCalled();
    });
  });
});
