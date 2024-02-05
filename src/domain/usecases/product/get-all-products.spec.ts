import { GetAllProductsUseCase } from '@domain/usecases/product/get-all-products';
import { getTestContainer } from '@utils/inversion-container-test';
import { Container } from 'inversify';
import mockAxios from 'jest-mock-axios';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';

describe('GetAllProductsUseCase', () => {

  let getAllProductsUseCase: GetAllProductsUseCase;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    getAllProductsUseCase = container.get(GetAllProductsUseCase);
  });

  it('should be defined', () => {
    expect(GetAllProductsUseCase).toBeDefined();
  });

  it('should have defined.',()=>{
    expect(getAllProductsUseCase).toBeDefined();
  });

  it('should call getAllProducts', async () => {
    const generator = new ProductMockGenerator();
    mockAxios.get.mockResolvedValueOnce({
      data: generator.generateMany(25)
    });

    const spy = jest.spyOn(GetAllProductsUseCase.prototype, 'call');
    const response = await getAllProductsUseCase.call();
    expect(spy).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBe(25);


  });
});
