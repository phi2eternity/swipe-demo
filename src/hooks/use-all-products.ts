import { useInjection } from 'inversify-react';
import { GetAllProductsUseCase } from '@domain/usecases/product/get-all-products';
import { ProductEntity } from '@domain/types/common/product';
import { useEffect, useState } from 'react';

const useAllProducts = () : ProductEntity[] => {
  const getAllProducts = useInjection<GetAllProductsUseCase>(GetAllProductsUseCase);
  const [products, setProducts] = useState<ProductEntity[]>([]);

  useEffect(() =>{
    getAllProducts.call().then((response) => {
      setProducts(response);
    });
  },[])
  products.sort((a, b) => a.name.localeCompare(b.name));

  return products;
}

export default useAllProducts;
