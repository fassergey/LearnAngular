import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PathNotFoundComponent } from './core/components/path-not-found/path-not-found.component';

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
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
