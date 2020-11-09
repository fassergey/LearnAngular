import { ProductsRoutingModule } from './products-routing.module';
import { NgModule } from '@angular/core';

import { ProductComponent, ProductListComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  exports: [ProductListComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
})
export class ProductsModule { }
