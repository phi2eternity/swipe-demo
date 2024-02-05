import { OffsetRequest } from '@domain/types/requests/offset';

describe('OffsetRequest', () => {
  it('should be created', () => {
    const offsetRequest: OffsetRequest = {
      limit: 1,
      offset: 1
    };
    expect(offsetRequest).toBeTruthy();
  });
  it('should be created as empty.', () => {
    const offsetRequest: OffsetRequest = {};
    expect(offsetRequest).toBeTruthy();
  });
  it('should be created with only limit.', () => {
    const offsetRequest: OffsetRequest = {
      limit: 1
    };
    expect(offsetRequest).toBeTruthy();
  });
  it('should be created with only offset.', () => {
    const offsetRequest: OffsetRequest = {
      offset: 1
    };
    expect(offsetRequest).toBeTruthy();
  });

});
