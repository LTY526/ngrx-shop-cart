import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { Product } from '../_models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../_ngrx/app.state';
import { getProducts, getProductsErrorMessage, getProductsLoading } from '../_ngrx/products/products.selectors';
import { ProductsApiActions } from '../_ngrx/products/products.actions';
import { AsyncPipe } from '@angular/common';
import { QueryModel } from '../_models/query-model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  queryModel: QueryModel = {
    pageSize: 10,
    page: 1,
  };
  products$: Observable<Product[]> = this.store.select(getProducts);
  errorMessages$: Observable<(string | null)[]> = combineLatest([
    this.store.select(getProductsErrorMessage).pipe(distinctUntilChanged()),
  ]).pipe(
    map((values: (string | null)[]) => values.filter(value => value !== null)),
  );
  loading$: Observable<boolean> = combineLatest([
    this.store.select(getProductsLoading)
  ]).pipe(
    map((loadings: boolean[])=> loadings.some(v => v))
  );

  ngOnInit(): void {
    this.refresh.pipe(
      tap(() => this.store.dispatch(ProductsApiActions.loadProductList({ queryModel: this.queryModel })))
    ).subscribe();

    this.errorMessages$.pipe( // Method 2 of displaying error (Method 1 is in products-api.effect)
      tap((errors) => {
        errors.forEach(error => console.error('(Method 2) Error:', error));
      })
    ).subscribe();
  }
}
