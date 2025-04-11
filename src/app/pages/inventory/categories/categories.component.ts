import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ButtonComponent } from "../../../ui/button/button.component";
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../../ui/dropdown/dropdown.component";
import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Category } from '../../../modules/products';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ButtonComponent, CommonModule, DropdownComponent, DialogModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = []
  gridMode: boolean = false;

  constructor(private apiService: ApiService, private dialog: Dialog, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.member;
        console.log(this.categories)
      },
      (error) => {
        this.toast.showToast('Error fetching product list', 'error')
      }
    );
  }

  openCreateProdForm() {
    const dialogRef = this.dialog.open(CreateProductFormComponent, {
      data: this.categories
    });

    dialogRef.closed.subscribe(product => {
      if (product) {
        console.log(product)
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
