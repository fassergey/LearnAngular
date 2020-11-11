import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { OrderModel } from './../models/order.model';
import { OrderArrayService } from './../services/order-array.service';

@Injectable({
  providedIn: 'any'
})
export class OrderResolveGuard implements Resolve<OrderModel> {
  constructor(
    private userArrayService: OrderArrayService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<OrderModel | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new OrderModel(null, '', '', null, 0));
    }

    const id = +route.paramMap.get('userID');

    return this.userArrayService.getOrderById(id).pipe(
      map((order: OrderModel) => {
        if (order) {
          return order;
        } else {
          this.router.navigate(['/orders']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/orders']);
        // catchError MUST return observable
        return of(null);
      })
    );
  }
}
