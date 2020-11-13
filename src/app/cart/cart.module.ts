import { NgModule } from '@angular/core';

import { LocalStorageService } from '../core/services/local-storage.service';
import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [
    CartRoutingModule.components
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class CartModule { }
