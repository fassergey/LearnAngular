import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Category } from '../../shared/models/category.enum';
import { ProductModel } from '../../shared/models/product';

const productList = [
  new ProductModel(1, 'Snowman', 'Ice-cream Snowman', 5, Category.Food, true),
  new ProductModel(2, 'HotHands', 'Gloves', 15, Category.Clothing, false),
  new ProductModel(3, 'BigFoot', 'Boots', 50, Category.Clothing, true)
];
const productListObservable: Observable<ProductModel[]> = of(productList);

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products$: Observable<ProductModel[]> = productListObservable;

  getProduct(id: number | string): Observable<ProductModel> {
    return this.products$
      .pipe(
        map((products: ProductModel[]) => products.find(p => p.id === +id)),
        catchError(err => throwError('Error in getProduct method'))
      );
  }

  createProduct(product: ProductModel): void {
    productList.push(product);
  }

  updateProduct(product: ProductModel): void {
    const idx = productList.findIndex(p => p.id === product.id);

    if (idx > -1) {
      productList.splice(idx, 1, product);
    }
  }
}
