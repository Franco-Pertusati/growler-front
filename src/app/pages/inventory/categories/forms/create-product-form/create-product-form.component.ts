import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../ui/button/button.component";

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css'
})
export class CreateProductFormComponent {

}
