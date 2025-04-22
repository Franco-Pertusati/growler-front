import { Routes } from '@angular/router';
import { ActiveShiftComponent } from './modules/shift/active-shift/active-shift.component';
import { ShiftGuard } from './core/guards/shift.guard';


export const routes: Routes = [
  {
    path: 'app',
    canActivate: [ShiftGuard],
    loadChildren: () => import('./modules/app/app.routes')
      .then(m => m.AUTH_ROUTES)
  },
  {
    canActivate: [ShiftGuard],
    path: 'active-shift',
    component: ActiveShiftComponent
  },
  {
    path: 'auth',
    canActivate: [ShiftGuard],
    loadChildren: () => import('./modules/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
];
