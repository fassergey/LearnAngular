import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductModel } from '../../shared/models/product';
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

  addProduct(product: ProductModel): void {
    const idx = this.getItemIndex(product);
    if (idx > -1) {
      this.products[idx].count++;
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        isAvailable: product.isAvailable,
        price: product.price,
        count: 1
      };
      this.products.push(newItem);
    }

    this.updateCartData();

    this.subject.next(this.products);
  }

  increaseQuantity(product: ProductModel): void {
    this.changeQuantity(product, 1);
  }

  decreaseQuantity(product: ProductModel): void {
    this.changeQuantity(product, -1);
  }

  removeProduct(product: ProductModel): void {
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

  getCartItemByProductId(id: number): Observable<CartItem> {
    return this.products$
      .pipe(
        map((products: CartItem[]) => products.find(p => p.id === id))
      );
  }

  private changeQuantity(product: ProductModel, difference: number): void {
    const idx = this.getItemIndex(product);
    this.products[idx].count += difference;

    if (this.products[idx].count === 0) {
      this.removeProduct(product);
    }

    this.updateCartData();

    this.subject.next(this.products);
  }

  private getItemIndex(product: ProductModel): number {
    return this.products.findIndex(ci => ci.name === product.name);
  }

  private calculateSum(): number {
    let sum = 0;
    this.products.forEach(ci => sum += ci.price * ci.count);
    return sum;
  }
}
