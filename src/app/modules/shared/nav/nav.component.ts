import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ThemeBtnComponent } from '../theme-btn/theme-btn.component';
import { AcordeonComponent } from '../acordeon/acordeon.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../dropdown/dropdown.component";

export interface MenuItem {
  label: string;
  icon: string;
  style: string;
  routerLink: string;
  children?: MenuItem[]; // Esto es para los items que tienen un acordeón
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ButtonComponent, ThemeBtnComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'home',
      style: 'wfull',
      routerLink: 'dashboard',
    },
    {
      label: 'Dinning area',
      icon: 'table_restaurant',
      style: 'wfull',
      routerLink: 'dining-area',
    },
    {
      label: 'Products',
      icon: 'restaurant',
      style: 'wfull',
      routerLink: 'products',
    },
    {
      label: 'Users',
      icon: 'group',
      style: 'wfull',
      routerLink: 'users',
    },
    {
      label: 'Start shift',
      icon: 'work',
      style: 'wfull',
      routerLink: 'start-shift'
    },
    {
      label: 'Shift history',
      icon: 'work_history',
      style: 'wfull',
      routerLink: 'shift-history'
    },
  ];

  constructor(private router: Router) { }

  isClosed: boolean = true;

  ngOnInit() {}

  isRouteActive(route: string | undefined): boolean {
    if (!route) return false;

    // Para rutas que comienzan con /app/ruta
    const fullRoute = route.startsWith('/app') ? route : `/app${route.startsWith('/') ? route : '/' + route}`;

    return this.router.isActive(fullRoute, {
      paths: 'subset',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored'
    });
  }
}
