import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProcessOrderComponent],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class OrdersModule { }
