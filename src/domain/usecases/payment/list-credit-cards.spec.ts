import { PaymentRepository } from '@domain/repositories/payment';
import { Container } from 'inversify';
import { PaymentListCreditCardsUseCase } from '@domain/usecases/payment/list-credit-cards';
import { getTestContainer } from '@utils/inversion-container-test';
import { mock } from 'jest-mock-extended';
import { CreditCardRecord } from '@domain/types/common/credit-card';

describe('PaymentListCreditCardsUseCase', () => {
  let container : Container;
  let paymentListCreditCardsUseCase : PaymentListCreditCardsUseCase;
  let paymentRepository : PaymentRepository;
  beforeAll(()=>{
    container = getTestContainer();
    paymentListCreditCardsUseCase = container.get(PaymentListCreditCardsUseCase);
    paymentRepository = container.get(PaymentRepository);
  });
  it('should be defined', () => {
    expect(paymentListCreditCardsUseCase).toBeDefined();
  });
  it('should list credit cards', async () => {
    const creditCardList = mock<CreditCardRecord[]>();
    const spyFunc = jest.spyOn(paymentRepository, 'listCreditCards').mockResolvedValueOnce(creditCardList);
    const result = await paymentListCreditCardsUseCase.call();
    expect(result).toEqual(creditCardList);
    expect(spyFunc).toBeCalled();
  });
});
