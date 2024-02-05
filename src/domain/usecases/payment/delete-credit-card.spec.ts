import { Container } from 'inversify';
import { PaymentDeleteCreditCardUseCase } from '@domain/usecases/payment/delete-credit-card';
import { PaymentRepository } from '@domain/repositories/payment';
import { getTestContainer } from '@utils/inversion-container-test';

describe('PaymentDeleteCreditCardUseCase', () => {
  let container : Container;
  let paymentDeleteCreditCardUseCase : PaymentDeleteCreditCardUseCase;
  let paymentRepository : PaymentRepository;
  beforeAll(()=>{
    container = getTestContainer();
    paymentDeleteCreditCardUseCase = container.get(PaymentDeleteCreditCardUseCase);
    paymentRepository = container.get(PaymentRepository);
  });
  it('should be defined', () => {
    expect(paymentDeleteCreditCardUseCase).toBeDefined();
  });
  it('should delete credit card', async () => {
    const spyFunc = jest.spyOn(paymentRepository, 'deleteCreditCard').mockResolvedValueOnce();
    await paymentDeleteCreditCardUseCase.call(1);
    expect(spyFunc).toBeCalled();
    expect(spyFunc).toBeCalledWith(1);
  });
});
