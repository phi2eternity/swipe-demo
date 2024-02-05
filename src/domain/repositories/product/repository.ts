import { injectable } from 'inversify';
import { ProductEntity } from '@domain/types/common/product';

@injectable()
export abstract class ProductRepository{
  abstract getAllProducts(): Promise<ProductEntity[]>;
}
