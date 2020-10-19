import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent, ProductListComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { ProductsService } from './services/products-service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductModule { }
