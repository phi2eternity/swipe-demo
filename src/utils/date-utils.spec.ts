import { getDateString } from '@utils/date-utils';

describe('getDateString', () => {
  it('should be defined.',() => {
    expect(getDateString).toBeDefined();
  });

  it('should return the correct date string.',() => {
    const date = new Date(2020, 10, 10);
    const dateString = getDateString(date.getDate(), date.getMonth(), date.getFullYear());
    expect(dateString).toEqual('2020-11-10');
  });

  it('should return the correct date string.',() => {
    const date = new Date(2020, 1, 1);
    const dateString = getDateString(date.getDate(), date.getMonth(), date.getFullYear());
    expect(dateString).toEqual('2020-02-01');
  });

});
