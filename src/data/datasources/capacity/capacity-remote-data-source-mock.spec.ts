import {CapacityRemoteDataSourceMock} from "@data/datasources/capacity/capacity-remote-data-source-mock";

describe('CapacityRemoteDataSourceMock', () => {
  it('should be defined.', () => {
    expect(CapacityRemoteDataSourceMock).toBeDefined();

  });

  it('generate february data correctly.', async () => {
    const availableRemoteDataSourceMock = new CapacityRemoteDataSourceMock();
    const monthlyCapacityRequest = {
      date: "02/2021",
      service: "We Wash"
    };
    const monthlyCapacityResponse = availableRemoteDataSourceMock.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Promise);
    const response = await monthlyCapacityResponse;
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBe(28);
  });

  it('generate january data correctly.', async () => {
    const availableRemoteDataSourceMock = new CapacityRemoteDataSourceMock();

    const monthlyCapacityRequest = {
      date: "01/2021",
      service: "We Wash",
      branches:[],
      employees:[]
    };
    const monthlyCapacityResponse = availableRemoteDataSourceMock.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Promise);
    const response = await monthlyCapacityResponse;
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBe(31);
  });

  it('generate november data correctly.', async () => {
    const availableRemoteDataSourceMock = new CapacityRemoteDataSourceMock();

    const monthlyCapacityRequest = {
      date: "11/2021",
      service: "We Wash",
      branches:[],
      employees:[]
    };
    const monthlyCapacityResponse = availableRemoteDataSourceMock.getMonthlyCapacity(monthlyCapacityRequest);
    expect(monthlyCapacityResponse).toBeDefined();
    expect(monthlyCapacityResponse).toBeInstanceOf(Promise);
    const response = await monthlyCapacityResponse;
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBe(30);
  });

});
