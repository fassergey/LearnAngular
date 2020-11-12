import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductsRoutingModule.components
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
})
export class ProductsModule { }
