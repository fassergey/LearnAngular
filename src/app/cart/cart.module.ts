import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  exports: [
    CartListComponent
  ],
  imports: [
    CommonModule
  ],
})
export class CartModule { }
