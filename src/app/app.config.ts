import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsApiReducer } from './_ngrx/products/products-api.reducer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ productListApi: productsApiReducer }),
    provideEffects(),
        NG_EVENT_PLUGINS
    ]
};
