import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { OrderModel } from '../../models/order.model';
import { OrderArrayService } from '../../services/order-array.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders$: Observable<OrderModel[]>;

  constructor(private orderArrayService: OrderArrayService) { }

  ngOnInit(): void {
    this.orders$ = this.orderArrayService.orders$;
  }

}
