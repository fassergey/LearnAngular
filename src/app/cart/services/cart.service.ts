import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductModel } from '../../shared/models/product';
import { CartItem } from '../models/cart-item';
import { LocalStorageService } from './../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalQuantity: number;
  totalSum: number;
  isEmpty: boolean;
  localStorageKey = 'cart';

  private products: CartItem[];
  private subject: BehaviorSubject<CartItem[]>;

  constructor(private localStorageService: LocalStorageService) {
    this.products = (this.localStorageService.getItem(this.localStorageKey) as CartItem[]) ?? new Array<CartItem>();
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
      const newItem: CartItem = { ...product, count: 1 };
      this.products.push(newItem);
    }

    this.updateCartData();
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
  }

  removeAllProducts(): void {
    this.products = [];
    this.updateCartData();
  }

  updateCartData(): void {
    this.totalQuantity = this.products && this.products.length > 0 ?
      this.products.length :
      0;

    this.totalSum = this.products && this.products.length > 0 ?
      this.calculateSum() :
      0;

    this.isEmpty = !(this.products && this.products.length > 0);

    this.localStorageService.setItem(this.localStorageKey, this.products);

    this.subject.next(this.products);
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
