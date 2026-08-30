import { Routes } from '@angular/router';

export const P01_SIGNALS_ROUTES: Routes = [
  {
    path: 'canvas',
    loadComponent: () => import('./canvas/p01-canvas').then((m) => m.P01Canvas),
  },
  {
    path: 'computed',
    loadComponent: () => import('./computed/p01-computed').then((m) => m.P01Computed),
  },
  {
    path: 'novice',
    loadComponent: () => import('./novice/p01-novice').then((m) => m.P01Novice),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'novice',
  },
];
