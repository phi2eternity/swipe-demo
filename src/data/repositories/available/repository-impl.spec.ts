import {AvailableRepositoryImpl} from "@data/repositories/available/repository-impl";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import mockAxios from "jest-mock-axios";
import {DailyAvailableSlotsRequest} from "@domain/types/requests/daily-available-slots-request";
import {DailyAvailableSlotsResponse} from "@domain/types/responses/daily-available-slots-response";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {EmployeeEntity} from "@domain/types/common/employee";
import {BranchEntity} from "@domain/types/common/branch";

describe('AvailableRepositoryImpl', () => {

  let availableRepository: AvailableRepositoryImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    availableRepository = container.get(AvailableRepository) as AvailableRepositoryImpl;
  });

  it('should be defined', () => {
    expect(AvailableRepositoryImpl).toBeDefined();
  });

  it('should return valid daily slots for date.', async () => {
    const dailyAvailableSlotsRequest = {
      date: '2021-02-01', service: 'We Wash'
    } as DailyAvailableSlotsRequest;

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

    mockAxios.post.mockResolvedValue(mockResponse);

    await availableRepository.getDailySlots(dailyAvailableSlotsRequest);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/available/daily', dailyAvailableSlotsRequest,undefined);
  });
});
