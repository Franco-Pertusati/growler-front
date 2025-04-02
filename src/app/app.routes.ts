import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/inventory/products/products.component';
import { CategoriesComponent } from './pages/inventory/categories/categories.component';
import { DinningAreaComponent } from './pages/dinning-area/dinning-area.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'products', component: ProductsComponent }, // Ruta para la página "about"
  { path: 'categories', component: CategoriesComponent },
  { path: 'dinning-area', component: DinningAreaComponent },
  // { path: '**', component: HOm },
];
