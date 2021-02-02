import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponentComponent } from './components/product-component/product-component.component';
import { ProductListComponentComponent } from './components/product-list-component/product-list-component.component';



@NgModule({
  declarations: [
    ProductComponentComponent,
    ProductListComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // ProductComponentComponent,
    ProductListComponentComponent
  ]
})
export class ProductsModule { }
