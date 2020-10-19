import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Map<Product, number> = new Map<Product, number>();
  private subject: BehaviorSubject<Map<Product, number>> = new BehaviorSubject<Map<Product, number>>(this.products);
  products$ = this.subject.asObservable();

  addToCart(product: Product): void {
    if (this.products.has(product)) {
      const previousValue = this.products.get(product);
      this.products.set(product, previousValue + 1);
    } else {
      this.products.set(product, 1);
    }

    this.subject.next(this.products);
  }

  changeItemNumber(product: Product, difference: number): void {
    let value = this.products.get(product);
    value += difference;
    if (value === 0) {
      this.removeItem(product);
    } else {
      this.products.set(product, value);
    }

    this.subject.next(this.products);
  }

  removeItem(product: Product): void {
    this.products.delete(product);

    this.subject.next(this.products);
  }
}
