import { NgModule } from '@angular/core';

import { ProductComponent, ProductListComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  exports: [ProductListComponent],
  imports: [
    SharedModule
  ],
})
export class ProductModule { }
