import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductModel } from '../../../shared/models/product';
import { CartService } from '../../../cart/services/cart.service';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: ProductModel;

  constructor(
    private store: Store,
    private cartService: CartService
  ) { }

  onBuy(): void {
    console.log(`Congratulations! You bought: ${this.product.name} by ${this.product.price}!`);
    this.cartService.addProduct(this.product);
  }

  onEdit(): void {
    const link = ['/edit', this.product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  onGoToProduct(): void {
    const link = ['product-list/product-view', this.product.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }
}
