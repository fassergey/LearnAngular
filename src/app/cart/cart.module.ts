import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponent } from './components/cart-list.component';
import { CartService } from './services/cart.service';

@NgModule({
  declarations: [
    CartListComponent
  ],
  exports: [
    CartListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CartService
  ]
})
export class CartModule { }
