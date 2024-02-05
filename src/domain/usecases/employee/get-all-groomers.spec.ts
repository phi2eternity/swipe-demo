import {getTestContainer} from "@utils/inversion-container-test";
import {GetAllGroomersUseCase} from "@domain/usecases/employee/get-all-groomers-use-case";
import {Container} from "inversify";
import mockAxios from "jest-mock-axios";

describe('GetAllGroomers', () => {
  let getAllGroomers: GetAllGroomersUseCase;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    getAllGroomers = container.get(GetAllGroomersUseCase);
  });

  it('should be defined', () => {
    expect(getAllGroomers).toBeDefined();
  });

  it('should return all groomers', async () => {

    const groomers = [
      {
        id: 1,
        createdAt: '2021-01-01',
        name: 'groomer1',
        email: 'email1',
        phone: 'phone1',
        role: "15",
      }
    ];

    mockAxios.get.mockResolvedValue({data: groomers});

    const result = await getAllGroomers.call();
    expect(result).toEqual(groomers);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/employees', {params: {role: "15"}});

  });

});
