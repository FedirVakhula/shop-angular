import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [
    CartListComponentComponent,
    CartItemComponent,
    CartComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CartRoutingModule,
  ]
})
export class CartModule { }
