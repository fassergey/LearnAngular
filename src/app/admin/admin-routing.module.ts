import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { ProductFormComponent, ProductResolveGuard } from '../products';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent, ManageProductsComponent, ManageOrdersComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        component: ManageProductsComponent,
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
          }
        ]
      },
      { path: 'orders', component: ManageOrdersComponent },
      { path: '', component: AdminDashboardComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ProductFormComponent
  ];
}
