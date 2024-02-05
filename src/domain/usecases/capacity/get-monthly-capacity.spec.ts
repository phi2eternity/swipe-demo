import {GetMonthlyCapacityUseCase} from "@domain/usecases/capacity/get-monthly-capacity";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {
  getMonthlyCapacityResponse, setAfternoonCapacity, setMorningCapacity
} from "@data/mocks/handlers/get-monthly-capacity";
import mockAxios from 'jest-mock-axios';
import { MonthlyCapacityRequest } from '@domain/types/requests/monthly-capacity-request';


describe('GetMonthlyCapacityUseCase', () => {

  let useCase: GetMonthlyCapacityUseCase;
  let container: Container;

  beforeAll(() => {

    container = getTestContainer();
    useCase = container.get(GetMonthlyCapacityUseCase);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the monthly capacity', async () => {
    const params: MonthlyCapacityRequest = {
      employees: [1, 2, 3], branches: [1, 2, 3], service: "service", date: "01/2023",

    };
    setMorningCapacity(0);
    setAfternoonCapacity(0);
    const date = new Date(2023, 0, 1)
    const response = getMonthlyCapacityResponse(date);
    mockAxios.post.mockResolvedValue({ data: response });


    const result = await useCase.call(params);
    expect(mockAxios.post).toHaveBeenCalled();
    expect(result).toEqual(response);
  });
});
