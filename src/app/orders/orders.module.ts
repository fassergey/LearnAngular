import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LocalStorageService } from '../core/services/local-storage.service';

@NgModule({
  declarations: [
    OrdersRoutingModule.components
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrdersModule { }
