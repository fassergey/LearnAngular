import { Injectable } from '@angular/core';

import { Category } from '../../shared/models/category.enum';
import { Product } from '../../shared/models/product';

@Injectable()
export class ProductsService {
  getProducts(): Product[] {
    return [
      {
        name: 'Snowman', description: 'Ice-cream Snowman', price: 5.00, category: Category.Food, isAvailable: true,
      },
      {
        name: 'HotHands', description: 'Gloves', price: 15.00, category: Category.Clothing, isAvailable: false,
      },
      {
        name: 'BigFoot', description: 'Boots', price: 50.00, category: Category.Clothing, isAvailable: true,
      },
    ];
  }
}
