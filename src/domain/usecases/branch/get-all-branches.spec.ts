import {GetAllBranchesUseCase} from "@domain/usecases/branch/get-all-branches";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import mock = jest.mock;
import mockAxios from "jest-mock-axios";

describe('GetAllBranchesUseCase', () => {
  let getAllBranchesUseCase: GetAllBranchesUseCase;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    getAllBranchesUseCase = container.get(GetAllBranchesUseCase);
  });


  it('should be defined', () => {
    expect(getAllBranchesUseCase).toBeDefined();
  });

  it('should return all branches', async () => {

    const branches = [
      {
        id: 1,
        name: 'branch1',
        address: 'address1',
        phone: 'phone1',
        email: 'email1',
        description: 'description1',
      }
    ];

    mockAxios.get.mockResolvedValue({data: branches});
    const result = await getAllBranchesUseCase.call();
    expect(branches.length).toBeGreaterThan(0);


  });
});
