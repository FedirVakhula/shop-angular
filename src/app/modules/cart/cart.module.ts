import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
  declarations: [
    CartListComponentComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartListComponentComponent
  ]
})
export class CartModule { }
