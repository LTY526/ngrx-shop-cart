import { DataState } from '../_models/data-state';
import { Product } from '../_models/product.model';

export interface AppState {
  productsApi: DataState<Product>;
  // adminProduct: unknown;
}