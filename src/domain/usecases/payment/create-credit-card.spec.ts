import { PaymentRepository } from '@domain/repositories/payment';
import { PaymentCreateCreditCardUseCase } from '@domain/usecases/payment/create-credit-card';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { mock } from 'jest-mock-extended';

describe('PaymentCreateCreditCardUseCase', () => {
  let paymentCreateCreditCardUseCase: PaymentCreateCreditCardUseCase;
  let paymentRepository: PaymentRepository;
  let container: Container;

  beforeAll(()=>{
    container = getTestContainer();
    paymentCreateCreditCardUseCase = container.get(PaymentCreateCreditCardUseCase);
    paymentRepository = container.get(PaymentRepository);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should be defined', () => {
    expect(paymentCreateCreditCardUseCase).toBeDefined();
  });
  it('should create a credit card', async () => {
    const creditCardInformation = mock<CreditCardInformation>();
    const creditCardRecord = mock<CreditCardRecord>();
    const spyFunc = jest.spyOn(paymentRepository, 'addCreditCard').mockResolvedValueOnce(creditCardRecord);
    const result = await paymentCreateCreditCardUseCase.call(creditCardInformation);
    expect(result).toEqual(creditCardRecord);
    expect(spyFunc).toBeCalledWith(creditCardInformation);
  });
});
