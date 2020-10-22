import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() increaseQuantity: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() decreaseQuantity: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() removeItem: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { console.log('CartItemComponent'); }

  onChangeQuantity(difference: number): void {
    difference === 1 ? this.increaseQuantity.emit(this.product) : this.decreaseQuantity.emit(this.product);
  }

  onRemoveProduct(): void {
    this.removeItem.emit(this.product);
  }
}
