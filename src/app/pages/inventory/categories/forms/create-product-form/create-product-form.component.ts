import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { Category, Product } from '../../../../../modules/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css'
})
export class CreateProductFormComponent {
  categoryForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const categoryData: any = {
      name: this.categoryForm.value.name,
      price: this.categoryForm.value.price,
      category: this.categoryForm.value,
    };

    this.apiService.createCategory(categoryData).subscribe({
      next: (response) => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error creating category, please try again.';
        console.error('Error creating category:', error);
      }
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }
}
