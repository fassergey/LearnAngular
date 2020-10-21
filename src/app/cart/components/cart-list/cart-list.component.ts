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
  products: Map<Product, number>;

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

  onChangeItemNumber(item: CartItem): void {
    this.cartService.changeItemNumber(item.product, item.count);
  }

  onRemoveItem(product: Product): void {
    this.cartService.removeItem(product);
  }

  get numberOfGoods(): number {
    return this.cartService.itemsNumber;
  }

  get sumOfGoods(): number {
    return this.cartService.sum;
  }

  refresh(): void {
    this.cdr.markForCheck();
  }

  trackByFn(index): number {
    return index;
  }
}
