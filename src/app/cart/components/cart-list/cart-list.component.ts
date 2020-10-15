import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Product } from '../../../shared/models/product';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit {
  products: Map<Product, number>;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.products = this.cartService.products;
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
}
