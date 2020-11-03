import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../../../shared/models/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {
  products: CartItem[];
  field: string;
  ascOrder: boolean;

  private sub: Subscription;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sub = this.cartService.products$.subscribe(data => this.products = data);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onIncreaseQuantity(product: Product): void {
    this.cartService.increaseQuantity(product);
  }

  onDecreaseQuantity(product: Product): void {
    this.cartService.decreaseQuantity(product);
  }

  onRemoveItem(product: Product): void {
    this.cartService.removeProduct(product);
  }

  get numberOfGoods(): number {
    return this.cartService.totalQuantity;
  }

  get sumOfGoods(): number {
    return this.cartService.totalSum;
  }

  asCartItem(o: object): CartItem {
    return o as CartItem;
  }

  refresh(): void {
    this.cdr.markForCheck();
  }

  trackByFn(index): number {
    return index;
  }
}
