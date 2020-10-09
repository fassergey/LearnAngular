import { Injectable } from '@angular/core';

import { Product } from './../../product/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = []; // думаю, модель должна содержать еще и количество товара

  constructor() { }

  addToCart(product: Product): void {
    this.products.push(product);
  }
}
// создайте папку app/cart/services и туда перенесите этот сервис
