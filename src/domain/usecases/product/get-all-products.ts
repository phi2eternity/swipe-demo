import { UseCaseWithNoParams} from "@quicker/common/use-case";
import {inject, injectable} from "inversify";
import { ProductEntity } from '@domain/types/common/product';
import { ProductRepository } from '@domain/repositories/product/repository';

@injectable()
export class GetAllProductsUseCase implements UseCaseWithNoParams<ProductEntity[]> {
  constructor(@inject(ProductRepository) private readonly repository: ProductRepository) {
  }

  async call(): Promise<ProductEntity[]> {
    return await this.repository.getAllProducts();
  }
}
