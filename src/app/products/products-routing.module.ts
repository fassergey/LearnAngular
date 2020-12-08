import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent, ProductListComponent, ProductViewComponent } from './components';
import { ProductsComponent } from './products.component';
import { ProductResolveGuard, ProductExistsGuard, ProductsStatePreloadingGuard } from './guards';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductsComponent,
    canActivate: [ProductsStatePreloadingGuard],
    children: [
      {
        path: 'product-view/:productID',
        component: ProductViewComponent,
        resolve: { product: ProductResolveGuard },
        canActivateChild: [ProductExistsGuard]
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
    ProductComponent,
    ProductViewComponent
  ];
}
