import { ProductEntity } from '@domain/types/common/product';
import { injectable } from 'inversify';
import { RemoteDataSource } from '@data/datasources/remote-data-source';

@injectable()
export abstract class ProductRemoteDataSource extends RemoteDataSource{
  abstract getAllProducts(): Promise<ProductEntity[]>;
}
