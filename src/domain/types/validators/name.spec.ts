import { nameValidator } from '@domain/types/validators/name';
describe('validateName', () => {
  it('returns valid:true when name is valid', () => {
    const result = nameValidator('John Doe');
    expect(result.valid).toBe(true);
  });
  it('returns valid:true when name is valid', () => {
    const result = nameValidator('John');
    expect(result.valid).toBe(true);
  });
  it('returns valid:true when name is valid', () => {
    const result = nameValidator('John Doe Doe');
    expect(result.valid).toBe(true);
  });
  it('returns valid:true when name is valid', () => {
    const result = nameValidator('John Doe Doe Doe');
    expect(result.valid).toBe(true);
  });
  it('returns valid:false when name is invalid', () => {
    const result = nameValidator('John Doe Doe Doe Doe');
    expect(result.valid).toBe(false);
  });
  it('returns valid:false when name is invalid', () => {
    const result = nameValidator('1');
    expect(result.valid).toBe(false);
  });
  it('returns valid:false when name is invalid', () => {
    const result = nameValidator('John1');
    expect(result.valid).toBe(false);
  });
  it('returns valid:false when name is invalid', () => {
    const result = nameValidator('');
    expect(result.valid).toBe(false);
  });
  it('returns valid:true when locale characters are used.', () => {
    const result = nameValidator('İbrahim Özdemir');
    expect(result.valid).toBe(true);
  });

});
