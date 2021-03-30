import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductsState } from './products.state';

export const selectTasksState = createFeatureSelector<AppState, ProductsState>('products');

export const selectProductsData = createSelector(selectTasksState, (state: ProductsState) => state.data);
export const selectProductsError = createSelector(selectTasksState, (state: ProductsState) => state.error);
export const selectProductsLoaded = createSelector(selectTasksState, (state: ProductsState) => state.loading);
