import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductFormComponent, ProductListComponent } from './components';
import { ProductsComponent } from './products.component';
import { ProductResolveGuard } from './guards/product-resolve.guard';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductsComponent,
    children: [
      {
        path: 'add',
        component: ProductFormComponent
      },
      {
        path: 'edit/:productID',
        component: ProductFormComponent,
        resolve: {
          product: ProductResolveGuard
        }
      },
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
    ProductFormComponent,
    ProductComponent
  ];
 }
