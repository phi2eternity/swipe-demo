import { ProductEntity } from '@domain/types/common/product';
import { injectable } from 'inversify';
import { LocalDataSource } from '@data/datasources/local-data-source';

@injectable()
export abstract class ProductLocalDataSource extends LocalDataSource{
  abstract getAllProducts(): ProductEntity[] | null;

  abstract setAllProducts(products: ProductEntity[]): void;
}
