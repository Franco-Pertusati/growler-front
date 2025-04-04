import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../../../modules/products';
import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../../../../ui/form/input/input.component";

@Component({
  selector: 'app-create-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './create-category-form.component.html',
  styleUrl: './create-category-form.component.css'
})
export class CreateCategoryFormComponent {
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

    const categoryData: Category = {
      name: this.categoryForm.value.name
    };

    this.apiService.createCategory(categoryData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigateByUrl('/products')
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
