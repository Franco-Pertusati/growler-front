import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/inventory/products/products.component';
import { CategoriesComponent } from './pages/inventory/categories/categories.component';
import { DinningAreaComponent } from './pages/dinning-area/dinning-area.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

export const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'products', component: CategoriesComponent },
  { path: 'dinning-area', component: DinningAreaComponent },
  { path: 'users', component: UsersListComponent },
];
