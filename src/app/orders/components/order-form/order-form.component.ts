import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { CanComponentDeactivate, DialogService } from 'src/app/core';
import { OrderModel } from '../../models/order.model';
import { OrderArrayService } from '../../services/order-array.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, CanComponentDeactivate {
  order: OrderModel;
  originalOrder: OrderModel;

  constructor(
    private orderArrayService: OrderArrayService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(pluck('order')).subscribe((order: OrderModel) => {
      this.order = { ...order };
      this.originalOrder = { ...order };
    });
  }

  onSaveOrder() {
    const order = {...this.order};

    if (order.id) {
      this.orderArrayService.updateOrder(order);
      this.router.navigate(['/orders', {editedUserID: order.id}]);
    } else {
      this.orderArrayService.createOrder(order);
      this.onGoBack();
    }
    this.originalOrder = {...this.order};
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
