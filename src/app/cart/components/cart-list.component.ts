import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Product } from './../../product/models/product';
import { CartService } from '../services/cart.service';

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
