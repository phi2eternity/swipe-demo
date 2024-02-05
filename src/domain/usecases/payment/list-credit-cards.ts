import { CreditCardRecord } from '@domain/types/common/credit-card';
import { UseCase } from '@common/use-case';
import { PaymentRepository } from '@domain/repositories/payment';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentListCreditCardsUseCase implements UseCase<void,Promise<CreditCardRecord[]>>{
  constructor(@inject(PaymentRepository) private paymentRepository: PaymentRepository) {
  }
  call(): Promise<CreditCardRecord[]> {
    return this.paymentRepository.listCreditCards();
  }
}
