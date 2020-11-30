import { Category } from 'src/app/shared/models';
import { IProduct, ProductModel } from 'src/app/shared/models/product';

export interface ProductsState {
  data: ReadonlyArray<IProduct>;
}

export const initialProductsState: ProductsState = {
    data: [
      new ProductModel(1, 'Product-1', 'ProductDescription-1', 11, Category.Other, true),
      new ProductModel(2, 'Product-2', 'ProductDescription-2', 12, Category.Other, true),
      new ProductModel(3, 'Product-3', 'ProductDescription-3', 13, Category.Other, false)
    ]
};
