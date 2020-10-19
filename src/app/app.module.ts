import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    CartModule,
    ProductModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
