import { createAction, props } from '@ngrx/store';
import { ProductModel } from 'src/app/interface/products';

export const loadProducts = createAction(
  '[Products] Load Productss'
);

export const loadProductsSuccess = createAction(
  '[Products] Load Productss Success',
  props<{ products: ProductModel[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Productss Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: ProductModel }>()
);

export const updateProductsSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: ProductModel }>()
);

export const updateProductsFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);
