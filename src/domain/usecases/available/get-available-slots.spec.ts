import {GetAvailableSlotsUseCase} from "@domain/usecases/available/get-available-slots";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import mockAxios from "jest-mock-axios";
import {generateAvailableSlotsResponse} from "@data/mocks/handlers/get-available-slots";

describe('GetAvailableSlotsUseCase', () => {

  let useCase: GetAvailableSlotsUseCase;
  let container: Container;

  beforeAll(() => {

    container = getTestContainer();
    useCase = container.get(GetAvailableSlotsUseCase);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return the available slots', async () => {
    const date = new Date(2023, 0, 1)
    const response = generateAvailableSlotsResponse(date);
    mockAxios.post.mockResolvedValue({data: response});

  });
});
