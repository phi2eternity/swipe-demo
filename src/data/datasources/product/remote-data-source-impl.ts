import { ProductEntity } from '@domain/types/common/product';
import { inject, injectable } from 'inversify';
import { ProductRemoteDataSource } from '@data/datasources/product/remote-data-source';
import { HttpClient } from '@quicker/common/http-client';
import { HttpClientSymbol } from '@domain/types/TYPES';

@injectable()
export class ProductRemoteDataSourceImpl implements ProductRemoteDataSource {
  constructor(@inject<HttpClient>(HttpClientSymbol) private readonly httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const response = await this.httpClient.get<ProductEntity[]>('/api/products/all');
    return response.data;
  }
}
