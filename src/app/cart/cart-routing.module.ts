import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    children: [
      {
        path: 'edit/:itemID',
        component: CartItemComponent
      },
      {
        path: '',
        component: CartListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
  static components = [CartComponent, CartListComponent, CartItemComponent];
}
