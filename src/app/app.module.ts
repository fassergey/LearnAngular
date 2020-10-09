import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ProductsService } from './product/services/products-service';
import { CartListComponent } from './cart-list/cart-list.component';
// import { CartService } from './shared/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent,
    ProductListComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot()
  ],
  providers: [
    ProductsService,
    // CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
