import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DataState, DataStateStatus } from '../../_models/data-state';
import { Product } from '../../_models/product.model';

export const productListApi = (state: AppState) => state.productListApi;

export const getProducts = createSelector(
  productListApi, (state: DataState<Product>): Product[] => state.data);

export const getProductsLoading = createSelector(
  productListApi, (state: DataState<Product>): boolean => state.status === DataStateStatus.Loading);

export const getProductsErrorMessage = createSelector(
  productListApi, (state: DataState<Product>): string | null => state.error);