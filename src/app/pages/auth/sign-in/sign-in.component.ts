import { Component } from '@angular/core';
import { ButtonComponent } from "../../../ui/button/button.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

}
