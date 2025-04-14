import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeBtnComponent } from '../shared/theme-btn/theme-btn.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ThemeBtnComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {}
