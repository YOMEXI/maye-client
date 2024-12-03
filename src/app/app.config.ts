import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import * as staffEffects from '../store/staff/effects/staff.effect';
import { provideEffects } from '@ngrx/effects';
import {
  staffFeatureKey,
  staffReducer,
} from '../store/staff/reducers/staff.reducer';
import {
  staffDashboardFeatureKey,
  staffDashboardReducer,
} from '../store/staff/reducers/staffDashboardReducer';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {
  staffStatusFeatureKey,
  staffStatusReducer,
} from '../store/staff/reducers/staffStatus.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore(),
    provideToastr(),
    provideState(staffFeatureKey, staffReducer),
    provideState(staffDashboardFeatureKey, staffDashboardReducer),
    provideState(staffStatusFeatureKey, staffStatusReducer),
    provideEffects(staffEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideCharts(withDefaultRegisterables()),
  ],
};
