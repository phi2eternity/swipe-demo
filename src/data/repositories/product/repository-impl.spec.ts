import { Container } from 'inversify';
import { ProductRepositoryImpl } from '@data/repositories/product/repository-impl';
import { getTestContainer } from '@utils/inversion-container-test';
import { ProductRepository } from '@domain/repositories/product/repository';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import mockAxios from 'jest-mock-axios';

describe('ProductRepositoryImpl', () => {
  let productRepositoryImpl: ProductRepositoryImpl;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    productRepositoryImpl = container.get(ProductRepository) as ProductRepositoryImpl;
  });

  beforeEach(() => {
    sessionStorage.clear();
    mockAxios.reset();
  });

  it('should be defined', () => {
    expect(ProductRepositoryImpl).toBeDefined();
  });

  it('should call getAllProducts', async () => {
    const spy = jest.spyOn(productRepositoryImpl, 'getAllProducts');
    const generator = new ProductMockGenerator();
    mockAxios.get.mockResolvedValueOnce({
      data: generator.generateMany(25)
    });
    await productRepositoryImpl.getAllProducts();

    expect(spy).toHaveBeenCalled();
  });

  it('should get called first remote, then sessionStorage', async () => {
    const generator = new ProductMockGenerator();
    mockAxios.get.mockResolvedValueOnce({
      data: generator.generateMany(25)
    });
    const spy = jest.spyOn(productRepositoryImpl, 'getAllProducts');
    await productRepositoryImpl.getAllProducts();
    expect(spy).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledWith('/api/products/all', undefined);
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();

    await productRepositoryImpl.getAllProducts();
    expect(spy).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
