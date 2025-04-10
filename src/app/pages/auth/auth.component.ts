import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonComponent, ThemeBtnComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {}
