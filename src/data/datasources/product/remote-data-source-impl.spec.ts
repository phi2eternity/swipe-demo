import { ProductRemoteDataSource } from '@data/datasources/product/remote-data-source';
import { Container } from 'inversify';
import { ProductRemoteDataSourceImpl } from '@data/datasources/product/remote-data-source-impl';
import { getTestContainer } from '@utils/inversion-container-test';
import mockAxios from 'jest-mock-axios';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';

describe('ProductRemoteDataSource', () => {
  let productRemoteDataSource: ProductRemoteDataSourceImpl;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    productRemoteDataSource = container.get(ProductRemoteDataSource) as ProductRemoteDataSourceImpl;
  });

  it('should be defined', () => {
    expect(ProductRemoteDataSource).toBeDefined();
  });

  it('should call /api/products/all', async () => {
    const generator = new ProductMockGenerator();
    mockAxios.get.mockResolvedValueOnce({
        data:  generator.generateMany(25)
      });

    const response = await productRemoteDataSource.getAllProducts();
    expect(response).toBeDefined();
    expect(response.length).toBe(25);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/products/all',undefined);


  });



});
