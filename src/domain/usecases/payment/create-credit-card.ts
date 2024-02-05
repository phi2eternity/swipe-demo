import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { UseCase } from '@common/use-case';
import { inject, injectable } from 'inversify';
import { PaymentRepository } from '@domain/repositories/payment';

@injectable()
export class PaymentCreateCreditCardUseCase implements UseCase<CreditCardInformation,Promise<CreditCardRecord>>{
  constructor(@inject(PaymentRepository) private paymentRepository: PaymentRepository) {
  }

  call(params: CreditCardInformation): Promise<CreditCardRecord> {
    return this.paymentRepository.addCreditCard(params);
  }
}
