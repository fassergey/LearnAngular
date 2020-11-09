import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [
    CartRoutingModule.components
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ],
})
export class CartModule { }
