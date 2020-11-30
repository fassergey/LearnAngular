import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PathNotFoundComponent } from './core/components/path-not-found/path-not-found.component';
import { OrdersModule } from './orders/orders.module';
import { httpInterceptorProviders } from './core/interceptors/index';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    PathNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    CartModule,
    ProductsModule,
    SharedModule,
    OrdersModule,
    HttpClientModule,
    RootStoreModule,
    AppRoutingModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [ httpInterceptorProviders ]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
 }
