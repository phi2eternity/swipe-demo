import {BranchLocalDataSourceImpl} from "@data/datasources/branch/local-data-source-impl";
import {BranchEntity} from "@domain/types/common/branch";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {BranchLocalDataSource} from "@data/datasources/branch/local-data-source";

describe('BranchLocalDataSourceImpl', () => {

  let branchLocalDataSource: BranchLocalDataSourceImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    branchLocalDataSource = container.get(BranchLocalDataSource) as BranchLocalDataSourceImpl;
  });

  it('should be defined', () => {
    expect(new BranchLocalDataSourceImpl()).toBeDefined();

  });

  it('should be able to set and get branches', () => {
    const branches: BranchEntity[] = [
      {
        id: 1,
        name: 'Branch 1',
        address: 'Address 1',
        phone: '123456789',
        email: '',
        description: '',
      }];
    branchLocalDataSource.setAllBranches(branches);
    expect(branchLocalDataSource.getAllBranches()).toEqual(branches);
  });
});
