import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../ui/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { Category, Product } from '../../../../../modules/products';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css'
})
export class CreateProductFormComponent {
  productForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  categories: any[] = []

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.member;
        console.log(this.categories)
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const productData = {
      name: this.productForm.value.name,
      price: parseFloat(this.productForm.value.price),
      category: `/api/categories/${this.productForm.value.category}`
    };

    this.apiService.createProduct(productData).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.detail || 'Error creating product';
        console.error('Full error:', error);
      }
    });
  }

  get name() {
    return this.productForm.get('name');
  }
}
