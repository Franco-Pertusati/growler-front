import { Component } from '@angular/core';
import { ThemeBtnComponent } from "../../shared/theme-btn/theme-btn.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ThemeBtnComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {}
