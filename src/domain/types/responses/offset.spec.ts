import { BranchEntity } from '@domain/types/common/branch';
import { OffsetResponse } from '@domain/types/responses/offset';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';

describe('OffsetResponse', () => {
  it('should be created', () => {
    const generator = new BranchMockGenerator();
    const offsetResponse: OffsetResponse<BranchEntity> = {
      count: 1,
      next: null,
      previous: null,
      results: generator.generateMany(5)
    };
    expect(offsetResponse).toBeTruthy();
  });

});
