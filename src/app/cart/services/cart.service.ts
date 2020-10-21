import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Map<Product, number> = new Map<Product, number>();

  get itemsNumber(): number {
    return this.products && this.products.size > 0 ?
      this.products.size :
      0;
  }

  get sum(): number {
    return this.products && this.products.size > 0 ?
      this.calculateSum() :
      0;
  }

  addToCart(product: Product): void {
    if (this.products.has(product)) {
      const previousValue = this.products.get(product);
      this.products.set(product, previousValue + 1);
    } else {
      this.products.set(product, 1);
    }
  }

  changeItemNumber(product: Product, difference: number): void {
    let value = this.products.get(product);
    value += difference;
    if (value === 0) {
      this.removeItem(product);
    } else {
      this.products.set(product, value);
    }
  }

  removeItem(product: Product): void {
    this.products.delete(product);
  }

  private calculateSum(): number {
    let sum = 0;
    for (const entry of this.products) {
      sum += entry[0].price * entry[1];
    }

    return sum;
  }
}
