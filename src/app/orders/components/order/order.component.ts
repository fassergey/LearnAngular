import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { OrderModel } from '../../models/order.model';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  @Input() order: OrderModel;
  @Output() editOrder = new EventEmitter<OrderModel>();

  constructor(public cartService: CartService) { }

  onEditOrder() {
    this.editOrder.emit(this.order);
  }

}
