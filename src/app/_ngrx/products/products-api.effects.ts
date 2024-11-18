import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsApiActions } from './products.actions';
import { catchError, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { Product } from '../../_models/product.model';

export const getProductsFromApi = createEffect(
  (actions$ = inject(Actions), http = inject(HttpClient)) => {
    return actions$.pipe(
      ofType(ProductsApiActions.loadProductList),
      switchMap(({ queryModel }) => {
        console.log('Query Model:', queryModel);
        // For triggering error:
        // return http.get<Product[]>('https://fakestoreapi.com/products1').pipe(
        return http.get<Product[]>('https://fakestoreapi.com/products').pipe(
          map(products => products), // do filter here
        );
      }),
      map(products => ProductsApiActions.loadProductListSuccess({ products })),
      catchError(error => of(ProductsApiActions.loadProductListFailure({ error })))
    );
  },
  { functional: true }
);

// Method 1 of displaying error
export const displayProductsApiError = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(ProductsApiActions.loadProductListFailure),
      distinctUntilChanged((prev, curr) => prev.error === curr.error),
      tap(({ error }) => {
        console.error('(Method 1) Error:', error);
      })
    );
  },
  { functional: true }
);