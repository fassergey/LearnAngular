import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from '../../../shared/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() product: ProductModel;
  @Input() count: number;
  @Output() increaseQuantity: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() decreaseQuantity: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() removeItem: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  constructor() { console.log('CartItemComponent'); }

  onChangeQuantity(difference: number): void {
    difference === 1 ? this.increaseQuantity.emit(this.product) : this.decreaseQuantity.emit(this.product);
  }

  onRemoveProduct(): void {
    this.removeItem.emit(this.product);
  }
}
