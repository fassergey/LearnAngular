import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LocalStorageService } from '../core/services/local-storage.service';
import { ClientEmailDirective } from './validators/client-email.directive';

@NgModule({
  declarations: [
    OrdersRoutingModule.components,
    ClientEmailDirective
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ClientEmailDirective],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrdersModule { }
