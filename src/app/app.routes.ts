import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../pages/main.routes').then((m) => m.routes),
  },
];
