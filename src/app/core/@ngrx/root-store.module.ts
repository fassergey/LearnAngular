import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { ProductsStoreModule } from './products/products-store.module';
import { environment } from './../../../environments/environment';
import { CustomSerializer, routerReducers, RouterEffects } from './router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      // All checks will automatically be disabled in production builds
      runtimeChecks: {
        strictStateImmutability: true,      // default value is true
        strictActionImmutability: true,     // default value is true
        strictStateSerializability: true,   // default value is false
        strictActionSerializability: false,  // default value is false
        strictActionWithinNgZone: true,     // default value is false
        strictActionTypeUniqueness: true    // default value is false
      }
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer // has a priority over routerState
    }),

    EffectsModule.forRoot([RouterEffects]),
    ProductsStoreModule,
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})
export class RootStoreModule { }
