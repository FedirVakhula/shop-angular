import { Action, createReducer, on } from '@ngrx/store';

import { initialProductsState, ProductsState } from './products.state';
import { ProductModel } from 'src/app/interface/products';
import * as ProductsActions from './products.actions';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => {
    const data: ProductModel[] = [...products];

    return {
      ...state,
      data,
      loading: false
    };
  }),

  on(ProductsActions.loadProductsFailure, (state, { error }) => {
    return {
      ...state,
      ...error,
      loading: false
    };
  }),

  on(ProductsActions.updateProduct, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ProductsActions.updateProductsSuccess, (state, { product }) => {
    const index: number = state.data.findIndex((elem: ProductModel) => elem.id === product.id);
    const data: ProductModel[] = [...state.data];
    data[index] = {...product};

    return {
      ...state,
      data,
      loading: false
    };
  }),
);


export function productsReducer(state: ProductsState | undefined, action: Action): ProductsState {
  return reducer(state, action);
}
