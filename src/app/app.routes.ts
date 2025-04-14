import { Routes } from '@angular/router';
import { ActiveShiftComponent } from './modules/shift/active-shift/active-shift.component';


export const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./modules/app/app.routes')
      .then(m => m.AUTH_ROUTES)
  },
  {
    path: 'active-shift',
    component: ActiveShiftComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
];
