import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { provideEffects } from '@ngrx/effects';
import * as productsApiEffect from './_ngrx/products/products-api.effects';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
    providers: [
      provideEffects(productsApiEffect)
    ]
  },
];
