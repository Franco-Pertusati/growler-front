import { Routes } from '@angular/router';
import { GrowlerComponent } from './growler/growler.component';
import { DinningAreaComponent } from '../shared/dinning-area/dinning-area.component';
import { HomeComponent } from './home/home.component';
import { DinningSettingsComponent } from './dinning-settings/dinning-settings.component';
import { CategoriesComponent } from './inventory/categories/categories.component';
import { UsersListComponent } from './users-list/users-list.component';
import { StartShiftComponent } from './start-shift/start-shift.component';
import { ShiftHistoryComponent } from './shift-history/shift-history.component';


export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: GrowlerComponent,
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'dining-area', component: DinningSettingsComponent },
      { path: 'products', component: CategoriesComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'start-shift', component: StartShiftComponent },
      { path: 'shift-history', component: ShiftHistoryComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
