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
    return this.products && this.products.size > 0 ?
      this.products.size :
      0;
  }

  get sumOfGoods(): number {
    return this.products && this.products.size > 0 ?
      this.calculateSum() :
      0;
  }

  refresh(): void {
    this.cdr.markForCheck();
  }

  private calculateSum(): number {
    let sum = 0;
    for (const entry of this.products) {
      sum += entry[0].price * entry[1];
    }

    return sum;
  }
}
