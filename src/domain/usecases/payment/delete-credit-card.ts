import { inject, injectable } from 'inversify';
import { UseCase } from '@common/use-case';
import { PaymentRepository } from '@domain/repositories/payment';

@injectable()
export class PaymentDeleteCreditCardUseCase implements UseCase<number,Promise<void>>{
  constructor(@inject(PaymentRepository) private paymentRepository: PaymentRepository) {
  }
  call(params: number): Promise<void> {
    return this.paymentRepository.deleteCreditCard(params);
  }
}
