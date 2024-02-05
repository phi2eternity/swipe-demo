import { ProductLocalDataSourceImpl } from '@data/datasources/product/local-data-source-impl';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { ProductLocalDataSource } from '@data/datasources/product/local-data-source';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';

describe('ProductLocalDataSourceImpl', () => {

  let container: Container;
  let productLocalDataSource: ProductLocalDataSourceImpl;

  beforeAll(() => {
    container = getTestContainer();
    productLocalDataSource = container.get(ProductLocalDataSource) as ProductLocalDataSourceImpl;
  });


  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should be defined', () => {
    expect(ProductLocalDataSourceImpl).toBeDefined();
  });

  it('should be able to get null when no products are set', () => {
    const result = productLocalDataSource.getAllProducts();
    expect(result).toBeNull();
  });


  it('should be able to set and get products', () => {
    const productGenerator = new ProductMockGenerator();
    const products = productGenerator.generateMany(25);

    productLocalDataSource.setAllProducts(products);
    const result = productLocalDataSource.getAllProducts();
    expect(result).toBeDefined();
    expect(result).toEqual(products);
    expect(result).toEqual(products);

  });
  it('should be able to set and get products multiple times.', () => {
    const productGenerator = new ProductMockGenerator();

    for (let i = 0; i < 5; i++) {
      const products = productGenerator.generateMany(25);

      productLocalDataSource.setAllProducts(products);
      const result = productLocalDataSource.getAllProducts();
      expect(result).toBeDefined();
      expect(result).toEqual(products);
      expect(result).toEqual(products);
    }
  });
});
