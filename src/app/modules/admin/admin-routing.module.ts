import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuards } from 'src/app/guards/all-guards.guard';
import { ProductListComponentComponent } from '../products/components/product-list-component/product-list-component.component';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AllGuards],

    children: [
      {
        path: 'products',
        component: ProductListComponentComponent
      },
      {
        path: 'products',
        canActivateChild: [AllGuards],
        children: [
          {
            path: 'add',
            component: AddProductComponent
          },
          {
            path: 'edit/:id',
            component: EditProductComponent,
            canDeactivate: [AllGuards],
            resolve: {
              product: AllGuards
            }
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
