import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponentComponent } from './components/product-component/product-component.component';
import { ProductListComponentComponent } from './components/product-list-component/product-list-component.component';
import { SharedModule } from '../shared/shared.module';
import { ProductViewComponent } from './components/product-view/product-view.component';



@NgModule({
  declarations: [
    ProductComponentComponent,
    ProductListComponentComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductListComponentComponent
  ]
})
export class ProductsModule { }
