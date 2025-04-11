import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/inventory/categories/categories.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { GrowlerComponent } from './pages/growler/growler.component';
import { ActiveShiftComponent } from './pages/active-shift/active-shift.component';
import { DinningSettingsComponent } from './pages/dinning-settings/dinning-settings.component';

export const routes: Routes = [
  {
    path: 'app', component: GrowlerComponent, children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'products', component: CategoriesComponent },
      { path: 'dinning-area', component: DinningSettingsComponent },
      { path: 'users', component: UsersListComponent },
    ]
  },
  {
    path: 'active-shift', component: ActiveShiftComponent
  },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    ]
  },
];
