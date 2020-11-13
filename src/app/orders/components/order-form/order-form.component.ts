import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrderModel } from '../../models/order.model';
import { OrderArrayService } from '../../services/order-array.service';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  order: OrderModel;
  originalOrder: OrderModel;

  private subCart: Subscription;
  private nextOrderIndex: number;

  constructor(
    private orderArrayService: OrderArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.nextOrderIndex = this.orderArrayService.proceedingOrdersCount + 1;

    this.subCart = this.cartService.products$.subscribe(data => {
      this.order = new OrderModel('', '', data, this.cartService.totalSum, null);
      this.originalOrder = { ...this.order };
    });
  }

  ngOnDestroy(): void {
    this.subCart.unsubscribe();
  }

  onSaveOrder() {
    const order = {...this.order};
    order.id = this.nextOrderIndex;

    if (this.order.id) {
      this.orderArrayService.updateOrder(order);
    } else {
      this.orderArrayService.createOrder(order);
      this.localStorageService.removeItem(this.cartService.localStorageKey);
      this.cartService.removeAllProducts();
    }

    this.originalOrder = {...this.order, id: this.nextOrderIndex};
    this.router.navigate(['orders']);
  }

  onGoBack() {
    this.router.navigate(['./../../'], { relativeTo: this.route});
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originalOrder).map(key => {
      if (this.originalOrder[key] === this.order[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
