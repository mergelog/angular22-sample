import { Routes } from '@angular/router';

export const P03_COMPO_ROUTES: Routes = [
  {
    path: 'canvas',
    loadComponent: () => import('./canvas/p03-canvas').then((m) => m.P03Canvas),
  },
  {
    path: 'c01-ng-content',
    loadComponent: () => import('./c01-ng-content/c01-ng-content').then((m) => m.C01NgContent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'canvas',
  },
];
