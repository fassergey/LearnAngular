import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../shared/models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: CartItem[];
  private subject: BehaviorSubject<CartItem[]>;

  constructor() {
    this.products = new Array<CartItem>();
    this.subject = new BehaviorSubject<CartItem[]>(this.products);
  }

  get products$(): Observable<CartItem[]> {
    return this.subject.asObservable();
  }

  get itemsNumber(): number {
    return this.products && this.products.length > 0 ?
      this.products.length :
      0;
  }

  get sum(): number {
    return this.products && this.products.length > 0 ?
      this.calculateSum() :
      0;
  }

  addToCart(product: Product): void {
    const idx = this.getItemIndex(product);
    if (idx > -1) {
      this.products[idx].count++;
    } else {
      this.products.push({ product, count: 1 });
    }

    this.subject.next(this.products);
  }

  changeItemNumber(product: Product, difference: number): void {
    const idx = this.getItemIndex(product);
    this.products[idx].count += difference;

    if (this.products[idx].count === 0) {
      this.removeItem(product);
    }

    this.subject.next(this.products);
  }

  removeItem(product: Product): void {
    const idx = this.getItemIndex(product);
    this.products.splice(idx, 1);
    this.subject.next(this.products);
  }

  private getItemIndex(product: Product): number {
    return this.products.findIndex(ci => ci.product === product);
  }

  private calculateSum(): number {
    // let sum = 0;
    // for (const item of this.products) {
    //   sum += item.product.price * item.count;
    // }

    // return sum;
    let sum = 0;
    this.products.forEach(ci => sum += ci.product.price * ci.count);
    return sum;
  }
}
