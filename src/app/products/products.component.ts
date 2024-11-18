import { Component, inject, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import { Product } from '../_models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../_ngrx/app.state';
import { getProducts, getProductsErrorMessage } from '../_ngrx/products/products.selectors';
import { ProductsApiActions } from '../_ngrx/products/products.actions';
import { AsyncPipe } from '@angular/common';

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
  private store = inject(Store<AppState>);
  products$: Observable<Product[]> = this.store.select(getProducts);
  productsErrorMessage$: Observable<string | null> = this.store.select(getProductsErrorMessage);

  ngOnInit(): void {
    this.store.dispatch(ProductsApiActions.loadProductList({ queryModel: null }));
    // Method 2 of displaying error
    this.productsErrorMessage$.pipe(
      distinctUntilChanged((prev, curr) => prev === curr),
      tap((err) => {
        if (err) {
          console.error('(Method 2) Error:', err);
        }
      }),
      distinctUntilChanged(),
    ).subscribe();
  }
}
