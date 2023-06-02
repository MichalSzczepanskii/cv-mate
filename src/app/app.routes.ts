import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./home/feature/home-feature.module')).HomeFeatureModule,
  },
];
