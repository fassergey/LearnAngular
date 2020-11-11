import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { OrderComponent, OrderFormComponent, OrderListComponent } from './components';

import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: 'add',
        component: OrderFormComponent
      },
      {
        path: 'edit/:orderID',
        component: OrderFormComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'orders-list',
        component: OrderListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  static components = [
    OrderFormComponent,
    OrderListComponent,
    OrdersComponent,
    OrderComponent
  ];
 }
