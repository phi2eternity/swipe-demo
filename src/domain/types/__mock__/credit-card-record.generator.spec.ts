import { CreditCardRecordMockGenerator } from '@domain/types/__mock__/credit-card-record.generator';

describe('CreditCardRecordMockGenerator', () => {
  const generator = new CreditCardRecordMockGenerator();

  it('should be defined', () => {
    expect(CreditCardRecordMockGenerator).toBeDefined();
  });
  it('should generate one', () => {
    const result = generator.generateOne();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('exp_month');
    expect(result).toHaveProperty('exp_year');
    expect(result).toHaveProperty('first6');
    expect(result).toHaveProperty('last4');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('brand');
  });
  it('should generate many', () => {
    const result = generator.generateMany(10);
    expect(result).toBeDefined();
    expect(result.length).toBe(10);
  });
});
