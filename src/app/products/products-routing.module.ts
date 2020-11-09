import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductFormComponent, ProductListComponent } from './components';

const routes: Routes = [
  {
    path: 'home',
    component: ProductListComponent
  },
  {
    path: 'edit/:productID',
    component: ProductFormComponent
  },
  {
    path: 'product/:productID',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
