import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ButtonComponent } from "../../../ui/button/button.component";
import { CommonModule } from '@angular/common';
import { DropdownComponent } from "../../../ui/dropdown/dropdown.component";
import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Category, Product } from '../../../modules/products';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ButtonComponent, CommonModule, DropdownComponent, DialogModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = []
  gridMode: boolean = true;

  constructor(private apiService: ApiService, private dialog: Dialog) { }

  ngOnInit(): void {
    this.loadCategories();
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
        console.log('Producto creado');
        this.loadCategories()
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el producto');
      }
    });
  }

  deleteProduct(prodId: number) {
    this.apiService.deleteProduct(prodId).subscribe({
      next: () => {
        console.log('Producto eliminado');
        this.loadCategories()
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el producto');
      }
    });
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

  constructor(private apiService: ApiService, private dialogRef: DialogRef) { }

  onSubmit() {
    this.apiService.createProduct(this.prodForm.value).subscribe({
      next: () => this.dialogRef.close(this.prodForm.value),
      error: (err) => console.error('Error creating product:', err)
    });
  }
}
