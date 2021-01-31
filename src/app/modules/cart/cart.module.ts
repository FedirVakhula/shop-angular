import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CartListComponentComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    CartListComponentComponent
  ]
})
export class CartModule { }
