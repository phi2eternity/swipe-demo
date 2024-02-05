import {CapacityRepositoryImpl} from "@data/repositories/capacity/repository-impl";
import {getTestContainer} from "@utils/inversion-container-test";
import {interfaces} from "inversify";
import Container = interfaces.Container;
import {
  CapacityRemoteDataSource,
} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceMock} from "@data/datasources/capacity/capacity-remote-data-source-mock";
import {CapacityRepository} from "@domain/repositories/capacity-repository";

describe('CapacityRepositoryImpl', () => {
  let container: Container;
  let availableRepository: CapacityRepositoryImpl;
  beforeAll(() => {
    container = getTestContainer();
    container.rebind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceMock);
    availableRepository = container.get<CapacityRepository>(CapacityRepository) as  CapacityRepositoryImpl;
  });
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should be defined', () => {
    expect(CapacityRepositoryImpl).toBeDefined();
  });

  it('should return valid results for february.', async() => {
    const monthlyCapacityRequest = {
      date:'02/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(28);

  });

  it('should return valid results for january.', async() => {
    const monthlyCapacityRequest = {
      date:'01/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(31);

  });

  it('should return valid results for april.', async() => {
    const monthlyCapacityRequest = {
      date:'04/2021',
      service:'We Wash'
    };
    const monthlyCapacityResponse = await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Array);
    expect(monthlyCapacityResponse.length).toBe(30);

  });

  it('should get first call from axios, then from sessionStorage.',async () => {
    const monthlyCapacityRequest = {
      date:'02/2021',
      service:'We Wash'
    };

    await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(sessionStorage.setItem).toHaveBeenCalled();
    await availableRepository.getMonthlyCapacity(monthlyCapacityRequest);
    expect(sessionStorage.getItem).toHaveBeenCalled();
  });


});
