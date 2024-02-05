import { MonthlyCapacityRequest } from "@domain/types/requests/monthly-capacity-request";
import { MonthlyCapacityResponse } from "@domain/types/responses/monthly-capacity-response";
import { CapacityRemoteDataSourceImpl } from "@data/datasources/capacity/capacity-remote-data-source-impl";
import { Container } from "inversify";
import { getTestContainer } from "@utils/inversion-container-test";
import { CapacityRemoteDataSource } from "@data/datasources/capacity/capacity-remote-data-source";
import mockAxios from "jest-mock-axios";

describe("CapacityRemoteDataSourceImpl", () => {
  let capacityRemoteDataSource: CapacityRemoteDataSourceImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    capacityRemoteDataSource = container.get(
      CapacityRemoteDataSource
    ) as CapacityRemoteDataSourceImpl;
  });

  it("should fetch monthly capacity successfully", async () => {
    const monthlyCapacityRequest: MonthlyCapacityRequest = {
      employees: [1, 2, 3],
      branches: [1, 2, 3],
      service: "service",
      date: "01/2023",
    };

    const mockResponse: MonthlyCapacityResponse = [
      {
        date: "2023-01-01",
        morning_capacity: 10,
        afternoon_capacity: 10,
      },
    ];
    mockAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await capacityRemoteDataSource.getMonthlyCapacity(
      monthlyCapacityRequest
    );
    expect(mockAxios.post).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
