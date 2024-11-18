import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../_models/product.model';
import { QueryModel } from '../../_models/query-model';

export const AdminProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Register Product': props<Product>(),
    'Remove Product': props<{ productId: number }>(),
  },
});

export const ProductsApiActions = createActionGroup({
  source: 'Product List API',
  events: {
    'Load Product List': props<{ queryModel: QueryModel | null | undefined }>(), // Called from the component
    'Load Product List Success': props<{ products: Product[] }>(), // Called from the effect
    'Load Product List Failure': props<{ error: string }>(), // Called from the effect
  },
});