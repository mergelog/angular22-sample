import { Routes } from '@angular/router';

export const P03_MAP_ROUTES: Routes = [
  {
    path: 'canvas',
    loadComponent: () => import('./canvas/p03-canvas').then((m) => m.P03Canvas),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'canvas',
  },
];
