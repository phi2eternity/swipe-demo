import { CustomerLoginUseCase } from '@domain/usecases/customer/login';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import mockAxios from 'jest-mock-axios';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import { LoginRequest } from '@domain/types/requests/login';

describe('LoginUseCase', () => {
  let useCase: CustomerLoginUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(CustomerLoginUseCase);
  });

  const authResponseGenerator = new AuthenticationResponseMockGenerator();

  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return the user', async () => {
    const data = authResponseGenerator.generateOne();
    mockAxios.post.mockResolvedValue({ data });
    const loginRequest = {
      email: '',
      password: '',
    } as LoginRequest;
    const response = await useCase.call(loginRequest);
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/customer/login', loginRequest, undefined);
    expect(response).toEqual(data);
  });
});
