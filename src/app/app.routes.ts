import { Routes } from '@angular/router';
import { HomeComponent } from './modules/app/home/home.component';
import { CategoriesComponent } from './modules/app/inventory/categories/categories.component';
import { UsersListComponent } from './modules/app/users-list/users-list.component';
import { SignInComponent } from './modules/app/auth/sign-in/sign-in.component';
import { AuthComponent } from './modules/app/auth/auth.component';
import { SignUpComponent } from './modules/app/auth/sign-up/sign-up.component';
import { GrowlerComponent } from './modules/app/growler/growler.component';
import { DinningSettingsComponent } from './modules/app/dinning-settings/dinning-settings.component';
import { ActiveShiftComponent } from './modules/shift/active-shift/active-shift.component';

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
