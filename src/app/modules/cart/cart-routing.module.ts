import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuards } from 'src/app/guards/all-guards.guard';
import { CartComponent } from './cart.component';
import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';
import { ProcessOrderComponent } from './components/process-order/process-order.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: 'process',
        component: ProcessOrderComponent,
      },
      {
        path: 'cart-list',
        component: CartListComponentComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
