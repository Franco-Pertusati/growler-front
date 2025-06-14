import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../../shared/dropdown/dropdown.component";
import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Category } from '../../../../core/interfaces/products';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CatProductsComponent } from "../cat-products/cat-products.component";
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ButtonComponent, CommonModule, DropdownComponent, DialogModule, CatProductsComponent, LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = []
  isLoading = false;

  constructor(private apiService: ApiService, private dialog: Dialog, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.isLoading = false;
      },
      (error) => {
        this.toast.showToast('Error fetching product list', 'error');
        this.isLoading = false;
      }
    );
  }

  openCreateProdForm() {
    const dialogRef = this.dialog.open(CreateProductFormComponent, {
      data: this.categories
    });

    dialogRef.closed.subscribe(product => {
      if (product) {
        this.createProduct(product)
      }
    });
  }

  createProduct(newProd: any) {
    this.apiService.createProduct(newProd).subscribe({
      next: () => {
        this.loadCategories()
        this.toast.showToast('Product created', 'check')
      },
      error: (err) => {
        this.toast.showToast('An error occurred while creating the product.', 'error')
      }
    });
  }

  deleteProduct(prodId: number) {
    this.apiService.deleteProduct(prodId).subscribe({
      next: () => {
        this.toast.showToast('Product deleted', 'check')
        this.loadCategories()
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.toast.showToast('An error occurred while deleting the product.', 'error')
      }
    });
  }

  demoRestrictionMessage() {
    this.toast.showToast('Modifications are not allowed during the demo version.', 'error')
  }
}

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-product-form.component.html',
})
export class CreateProductFormComponent {
  prodForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
      Validators.max(1000000),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ])
  });
  data = inject(DIALOG_DATA);

  constructor(private dialogRef: DialogRef) { }

  submit() {
    if (this.prodForm.valid) {
      this.dialogRef.close(this.prodForm.value)
    }
  }
}
