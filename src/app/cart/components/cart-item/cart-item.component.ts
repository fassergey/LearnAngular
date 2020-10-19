import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CartItem } from '../../models/cart-item';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() product: Product;
  @Input() count: number;
  @Output() changeItemNumber: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() removeItem: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  onChangeNumber(difference: number): void {
    const model: CartItem = {
      product: this.product,
      count: difference
    };
    this.changeItemNumber.emit(model);
  }

  onRemove(): void {
    this.removeItem.emit(this.product);
  }
}
