import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-btn',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './theme-btn.component.html',
  styleUrl: './theme-btn.component.css'
})
export class ThemeBtnComponent {
  currentTheme: 'light' | 'dark';

  constructor(private themeService: ThemeService) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getCurrentTheme();
  }
}
