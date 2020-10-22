import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../shared/models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalQuantity: number;
  totalSum: number;
  isEmpty: boolean;

  private products: CartItem[];
  private subject: BehaviorSubject<CartItem[]>;

  constructor() {
    this.products = new Array<CartItem>();
    this.subject = new BehaviorSubject<CartItem[]>(this.products);
  }

  get products$(): Observable<CartItem[]> {
    return this.subject.asObservable();
  }

  addProduct(product: Product): void {
    const idx = this.getItemIndex(product);
    if (idx > -1) {
      this.products[idx].count++;
    } else {
      this.products.push({ product, count: 1 });
    }

    this.updateCartData();

    this.subject.next(this.products);
  }

  increaseQuantity(product: Product): void {
    this.changeQuantity(product, 1);
  }

  decreaseQuantity(product: Product): void {
    this.changeQuantity(product, -1);
  }

  removeProduct(product: Product): void {
    const idx = this.getItemIndex(product);
    this.products.splice(idx, 1);
    this.updateCartData();
    this.subject.next(this.products);
  }

  removeAllProducts(): void {
    this.products = [];
    this.updateCartData();
    this.subject.next(this.products);
  }

  updateCartData(): void {
    this.totalQuantity = this.products && this.products.length > 0 ?
      this.products.length :
      0;

    this.totalSum = this.products && this.products.length > 0 ?
      this.calculateSum() :
      0;

    this.isEmpty = !(this.products && this.products.length > 0);
  }

  private changeQuantity(product: Product, difference: number): void {
    const idx = this.getItemIndex(product);
    this.products[idx].count += difference;

    if (this.products[idx].count === 0) {
      this.removeProduct(product);
    }

    this.updateCartData();

    this.subject.next(this.products);
  }

  private getItemIndex(product: Product): number {
    return this.products.findIndex(ci => ci.product === product);
  }

  private calculateSum(): number {
    let sum = 0;
    this.products.forEach(ci => sum += ci.product.price * ci.count);
    return sum;
  }
}
