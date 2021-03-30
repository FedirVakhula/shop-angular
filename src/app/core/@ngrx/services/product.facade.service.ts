import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/interface/products';

import * as ProductsActions from '../products/products.actions';
import * as RouterActions from '../router/router.actions';
import { selectProductsData, selectProductsLoaded } from '../products/products.selectors';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  products$: Observable<ReadonlyArray<ProductModel>>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProductsData);
    this.isLoading$ = this.store.select(selectProductsLoaded);

  }

  getProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  goBack(): void {
    this.store.dispatch(RouterActions.back());
  }

  goNavigateTo(props: {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }): void {
    this.store.dispatch(RouterActions.go(props));
  }

  updateProduct(product: ProductModel): void {
    this.store.dispatch(ProductsActions.updateProduct({product}));
  }
}
