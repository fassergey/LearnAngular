import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Category } from '../../shared/models/category.enum';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(): Observable<Product[]> {
    return of([
      {
        name: 'Snowman', description: 'Ice-cream Snowman', price: 5.00, category: Category.Food, isAvailable: true,
      },
      {
        name: 'HotHands', description: 'Gloves', price: 15.00, category: Category.Clothing, isAvailable: false,
      },
      {
        name: 'BigFoot', description: 'Boots', price: 50.00, category: Category.Clothing, isAvailable: true,
      },
    ]);
  }
}
