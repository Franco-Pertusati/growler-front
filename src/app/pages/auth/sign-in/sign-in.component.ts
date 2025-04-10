import { Component } from '@angular/core';
import { ThemeBtnComponent } from "../../../ui/theme-btn/theme-btn.component";
import { ButtonComponent } from "../../../ui/button/button.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ThemeBtnComponent, ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
