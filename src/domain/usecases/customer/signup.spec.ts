import { CustomerSignupUseCase } from '@domain/usecases/customer/signup';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { AuthenticationResponseMockGenerator } from '@domain/types/__mock__/authentication-response';
import mockAxios from 'jest-mock-axios';
import { SignupRequest } from '@domain/types/requests/signup';

describe('SignupUseCase', () => {
  let useCase: CustomerSignupUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    useCase = container.get(CustomerSignupUseCase);
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
    const request = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    } as SignupRequest;
    const response = await useCase.call(request) ;
    expect(mockAxios.post).toHaveBeenCalledWith('/api/auth/customer/register', request, undefined);
    expect(response).toEqual(data);
  });

});
