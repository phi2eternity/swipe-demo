import {BranchLocalDataSourceImpl} from "@data/datasources/branch/local-data-source-impl";
import mockAxios from "jest-mock-axios";
import {BranchRemoteDataSourceImpl} from "@data/datasources/branch/remote-data-source-impl";
import {Container} from "inversify";
import {BranchRemoteDataSource} from "@data/datasources/branch/remote-data-source";
import {getTestContainer} from "@utils/inversion-container-test";

describe('BranchLocalDataSourceImpl', () => {
    let branchRemoteDataSource: BranchRemoteDataSourceImpl;
    let container: Container;
    beforeAll(() => {
        container = getTestContainer();
        branchRemoteDataSource = container.get(BranchRemoteDataSource) as BranchRemoteDataSourceImpl;
    });

   it('should be defined.', () => {
      expect(new BranchLocalDataSourceImpl()).toBeDefined();
   });
   it('can get all branches.',async () => {

     mockAxios.get.mockResolvedValue({data: []});

     const result = await branchRemoteDataSource.getAllBranches();
     expect(mockAxios.get).toHaveBeenCalledWith('/api/branch/all', undefined);

   });
});
