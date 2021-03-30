import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ProductModel } from 'src/app/interface/products';

import { ApiProductsService } from 'src/app/services/api-products.service';
import { ProductFacadeService } from '../services/product.facade.service';
import * as ProductsActions from './products.actions';



@Injectable()
export class ProductsEffects {



  constructor(
    private actions$: Actions,
    private apiProductsService: ApiProductsService,
    private productFacadeService: ProductFacadeService,
  ) { }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(action =>
        this.apiProductsService
          .getProducts()
          .then(products => ProductsActions.loadProductsSuccess({ products }))
          .catch(error => ProductsActions.loadProductsFailure({ error }))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      delay(2000),
      switchMap((action) =>
        this.apiProductsService.updateProducts(action.product)
        .then(() => {
          const path = ['/product', action.product.id];
          this.productFacadeService.goNavigateTo({ path });
          return ProductsActions.updateProductsSuccess({ product: action.product });
        })
        .catch(error => ProductsActions.updateProductsFailure({ error }))
      )
    )
  );
}
