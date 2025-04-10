import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";
import { AcordeonComponent } from "../../ui/acordeon/acordeon.component";
import { NavigationEnd, Router } from '@angular/router';

export interface MenuItem {
  label: string;
  icon: string;
  style: string;
  routerLink?: string;
  children?: MenuItem[]; // Esto es para los items que tienen un acordeón
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ButtonComponent, ThemeBtnComponent, AcordeonComponent],
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
      routerLink: 'dinning-area',
    },
    {
      label: 'Products',
      icon: 'restaurant',
      style: 'wfull',
      children: [
        {
          label: 'Products list',
          icon: 'assignment',
          style: 'wfull',
          routerLink: 'products',
        },
        {
          label: 'Ingredients list',
          icon: 'assignment',
          style: 'wfull',
        },
      ],
    },
    {
      label: 'Users',
      icon: 'group',
      style: 'wfull',
      routerLink: 'users',
    },
    {
      label: 'Shifts',
      icon: 'work',
      style: 'wfull',
      children: [
        {
          label: 'Start shift',
          icon: 'work',
          style: 'wfull',
        },
        {
          label: 'Shift history',
          icon: 'work_history',
          style: 'wfull',
        },
      ],
    },
    {
      label: 'Settings',
      icon: 'settings',
      style: 'wfull',
      routerLink: ' ',
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

  isRouteActive(route: string | undefined): boolean {
    if (!route) return false;
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}
