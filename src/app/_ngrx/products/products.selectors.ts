import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DataState } from '../../_models/data-state';
import { Product } from '../../_models/product.model';

export const productsApi = (state: AppState) => state.productsApi;

export const getProducts = createSelector(
  productsApi, (state: DataState<Product>) => state.data);

export const getProductsErrorMessage = createSelector(
  productsApi, (state: DataState<Product>) => state.error);