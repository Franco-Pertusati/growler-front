import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";
import { AcordeonComponent } from "../../ui/acordeon/acordeon.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ButtonComponent, ThemeBtnComponent, AcordeonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {}
