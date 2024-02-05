import { injectable } from 'inversify';
import { ProductEntity } from '@domain/types/common/product';
import { ProductLocalDataSource } from '@data/datasources/product/local-data-source';

@injectable()
export class ProductLocalDataSourceImpl implements ProductLocalDataSource {
  getAllProducts(): ProductEntity[] | null {
    const result = localStorage.getItem('products');
    if(result) {
      return JSON.parse(result) as ProductEntity[];
    }else{
      return null;
    }
  }

  setAllProducts(products: ProductEntity[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }
}
