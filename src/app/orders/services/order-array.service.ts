import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderArrayService {
  private orders: OrderModel[] = new Array<OrderModel>();
  private subject: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>(this.orders);

  get orders$(): Observable<OrderModel[]> {
    return this.subject.asObservable();
  }

  get proceedingOrdersCount(): number {
    return this.orders.length;
  }

  getOrderById(id: number | string): Observable<OrderModel> {
    return this.orders$
      .pipe(
        map((orders: Array<OrderModel>) => orders.find(order => order.id === +id)),
        catchError(err => throwError('Error in getUser method'))
      );
  }

  getOrderByUserName(firstName: string, lastName: string): Observable<OrderModel> {
    return this.orders$
      .pipe(
        map((orders: Array<OrderModel>) => orders.find(order => order.clientFirstName === firstName && order.clientLastName === lastName)),
        catchError(() => throwError('Error in getUser method'))
      );
  }

  createOrder(order: OrderModel): void {
    this.orders.push(order);
    this.subject.next(this.orders);
  }

  updateOrder(order: OrderModel): void {
    const i = this.orders.findIndex(o => o.id === order.id);

    if (i > -1) {
      this.orders.splice(i, 1, order);
      this.subject.next(this.orders);
    }
  }

}
