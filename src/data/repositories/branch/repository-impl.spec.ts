import '@quicker/__mocks__/storage';
import {BranchRepositoryImpl} from "@data/repositories/branch/repository-impl";
import {getTestContainer} from "@utils/inversion-container-test";
import {BranchRepository} from "@domain/repositories/branch/repository";
import {Container} from "inversify";
import mockAxios from "jest-mock-axios";

describe('BranchRepositoryImpl', () => {

  let branchRepository: BranchRepositoryImpl;
  let container: Container;
  beforeAll(()=> {
    container = getTestContainer();
    branchRepository = container.get(BranchRepository) as BranchRepositoryImpl;
  });

  it('should be defined.', () => {
    expect(BranchRepositoryImpl).toBeDefined();
  });

  it('can get all branches.', async () => {
    const allBranches = [
      {
        id: 1,
        name: 'branch1',
        address: 'address1',
        phone: 'phone1',
        email: 'email1',
        description: 'description1',

      }
    ];
    mockAxios.get.mockResolvedValue({data: allBranches});

    const result = await branchRepository.getAllBranches();
    expect(result).toBeDefined();
    expect(result).toEqual(allBranches);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/branch/all', undefined);


  });
  it('should get all branches from session storage on second call.', async () => {

    const allBranches = [
      {
        id: 1,
        name: 'branch1',
        address: 'address1',
        phone: 'phone1',
        email: 'email1',
        description: 'description1',

      }
    ];
    mockAxios.get.mockResolvedValue({data: allBranches});

    const result = await branchRepository.getAllBranches();
    expect(result).toBeDefined();
    expect(result).toEqual(allBranches);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/branch/all', undefined);

    const result2 = await branchRepository.getAllBranches();
    expect(result2).toBeDefined();
    expect(result2).toEqual(allBranches);

    // Check if local storage.getItem is called.
    expect(localStorage.getItem).toHaveBeenCalled();

  });

});
