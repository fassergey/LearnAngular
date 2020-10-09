import { Injectable } from '@angular/core';

import { Product } from '../../product/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];
  count: number;

  constructor() { }

  addToCart(product: Product): void {
    this.products.push(product);
  }
}
