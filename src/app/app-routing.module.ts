import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuards } from './guards/all-guards.guard';
import { LoginComponent } from './modules/login/login.component';
import { ProductListComponentComponent } from './modules/products/components/product-list-component/product-list-component.component';
import { ProductViewComponent } from './modules/products/components/product-view/product-view.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponentComponent
  },
  {
    path: 'product/:id',
    component: ProductViewComponent
  },
  {
    path: 'cart',
    loadChildren: () => import('src/app/modules/cart/cart.module').then(m => m.CartModule),
    canLoad: [AllGuards]
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AllGuards],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
