import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductListComponent } from './components';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductsComponent,
    children: [
      {
        path: 'product/:productID',
        component: ProductComponent
      },
      {
        path: '',
        component: ProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
  static components = [
    ProductsComponent,
    ProductListComponent,
    ProductComponent
  ];
 }
