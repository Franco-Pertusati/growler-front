import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página de inicio
  // { path: 'about', component: AboutComponent }, // Ruta para la página "about"
  // { path: '**', component: NotFoundComponent },
];
