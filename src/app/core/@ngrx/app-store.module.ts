import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { ProductsStoreModule } from './products/products-store.module';
import { environment } from 'src/environments/environment';
import { RouterEffects } from './router/router.effects';
import { CustomSerializer } from './router/router.custom-serializer';
import { routerReducers } from './router/router.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    ProductsStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],

  ]
})
export class AppStoreModule { }
