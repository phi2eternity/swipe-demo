import {BranchEntity} from "@domain/types/common/branch";

describe('BranchEntity', () => {
  it('should be defined.', () => {
    const branchEntity: BranchEntity = {
      id: 1,
      name: 'branch 1',
      description: 'branch 1',
      address: '123 main st',
      email: 'branch1@gmail.com',
      updatedAt: '2020-01-01',
      createdAt: '2020-01-01',
    };
    expect(branchEntity).toBeDefined();
  });
});
