import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { changeNameStatus, p00CanvasFeature } from './store/p00.canvas.store';
import { provideEffects } from '@ngrx/effects';
import { P00_EVO_FEATURE_KEY, p00EvoReducer } from './store/p00.evo.store';
import { P00_NOVICE_FEATURE_KEY, p00NoviceReducer } from './store/P00.novice.store';

export const P00_NGRX_ROUTES: Routes = [
  {
    path: 'canvas',
    providers: [
      provideState(p00CanvasFeature),
      provideEffects({ changeNumStatus: changeNameStatus }),
    ],
    loadComponent: () => import('./canvas/p00-canvas').then((m) => m.P00Canvas),
  },
  {
    path: 'evolution',
    providers: [
      provideState(P00_EVO_FEATURE_KEY, p00EvoReducer),
    ],
    loadComponent: () => import('./evolution/p00-evolution').then((m) => m.P00Evolution),
  },
  {
    path: 'novice',
    providers: [
      provideState(P00_NOVICE_FEATURE_KEY, p00NoviceReducer),
    ],
    loadComponent: () => import('./novice/p00-novice').then((m) => m.P00Novice),
  },
  {
    path: 'sample-01-in-out',
    loadComponent: () =>
      import('./sample-01-in-out/sample-01-in-out').then(
        (m) => m.Sample01InOut,
      ),
  },
  {
    path: 'sample-02-standalone',
    loadComponent: () =>
      import('./sample-02-standalone/sample-02-standalone').then(
        (m) => m.Sample02Standalone,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'novice',
  },
];
