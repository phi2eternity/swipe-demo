import {GetMeUseCase} from "@domain/usecases/customer/get-me";
import {getTestContainer} from "@utils/inversion-container-test";
import {Container} from "inversify";
import mockAxios from "jest-mock-axios";
import {MeResponse} from "@domain/types/responses/me-response";

describe('GetMeUseCase', () => {
  let useCase: GetMeUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(GetMeUseCase);

  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the user', async () => {
    const data = {
      id: 1,
      lifetime_tips: 0,
      lifetime_product_sales: 0,
      lifetime_service_sales: 0,
      dogs: [],
      created_at: "2021-01-01T00:00:00.000Z",
      updated_at: "2021-01-01T00:00:00.000Z",
      name: "Test",
      uid: "test",
      email: "",
      phone: "",
      address: "",
      role: 1,
      user: 1
    } as MeResponse;
    mockAxios.get.mockResolvedValue({data });

    const response = await useCase.call();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/me', undefined);

    expect(response).toEqual(data);
  });
});
