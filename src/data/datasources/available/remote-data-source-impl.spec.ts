import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import mockAxios from "jest-mock-axios";
import {EmployeeEntity} from "@domain/types/common/employee";
import {BranchEntity} from "@domain/types/common/branch";

describe('AvailableRemoteDataSourceImpl', () => {
  let availableRemoteDataSourceImpl: AvailableRemoteDataSourceImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    availableRemoteDataSourceImpl = container.get(
      AvailableRemoteDataSource
    ) as AvailableRemoteDataSourceImpl;
  });



  it('should fetch daily slots successfully', async () => {
    const dailyAvailableSlotsRequest: DailyAvailableSlotsRequest = {
      employees: [1, 2, 3],
      branches: [1, 2, 3],
      service: 'service',
      date: '01/2023',
    };

    const employee = {
      id: 3,
      name: `Employee 3`,

    } as EmployeeEntity;

    const branch = {
      id: 3,
      name: `Branch 3`,
      address: `Address 3`,
      phone: `Phone 3`,
      email: `Email 3`,
    } as BranchEntity;

    const mockResponse: DailyAvailableSlotsResponse = [
      {
        start: '08:00',
        end: '08:30',
        employee,
        branch,
          },
      {
        start: '08:30',
        end: '09:00',
        employee,
        branch,
      }
    ];
    mockAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await availableRemoteDataSourceImpl.getDailySlots(
      dailyAvailableSlotsRequest
    );
    expect(mockAxios.post).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/available/daily', dailyAvailableSlotsRequest,undefined);
  });
});
