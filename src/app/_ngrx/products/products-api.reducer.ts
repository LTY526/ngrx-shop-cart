import { createReducer, on } from '@ngrx/store';
import { DataState, DataStateStatus } from '../../_models/data-state';
import { Product } from '../../_models/product.model';
import { ProductsApiActions } from './products.actions';

export const initialState: DataState<Product> = {
  data: [],
  error: null,
  status: DataStateStatus.Pending,
};

export const productsApiReducer = createReducer(
  initialState,
  on(ProductsApiActions.loadProductList, (state, _) => ({
    ...state,
    status: DataStateStatus.Loading,
  })),
  on(ProductsApiActions.loadProductListSuccess, (state, { products }) => ({
    ...state,
    data: products,
    error: null,
    status: DataStateStatus.Success,
  })),
  on(ProductsApiActions.loadProductListFailure, (state, { error }) => ({
    ...state,
    data: [],
    error: error,
    status: DataStateStatus.Error,
  })),
);
