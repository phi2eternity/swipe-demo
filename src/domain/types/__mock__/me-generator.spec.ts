import { MeMockGenerator } from '@domain/types/__mock__/me-generator';

describe('MeMockGenerator', () => {
  it('should be instantiable', () => {
    const meMockGenerator = new MeMockGenerator();
    expect(meMockGenerator).toBeTruthy();
  });
  it('should generate one', () => {
    const meMockGenerator = new MeMockGenerator();
    const me = meMockGenerator.generateOne();
    expect(me).toBeTruthy();
  });
  it('should generate many', () => {
    const meMockGenerator = new MeMockGenerator();
    const me = meMockGenerator.generateMany(10);
    expect(me).toBeTruthy();
    expect(me.length).toBe(10);
  });

});
