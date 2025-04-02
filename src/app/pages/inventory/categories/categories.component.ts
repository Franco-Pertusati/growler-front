import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../modules/products';
import { CreateCategoryFormComponent } from "./forms/create-category-form/create-category-form.component";
import { CreateProductFormComponent } from "./forms/create-product-form/create-product-form.component";
import { ButtonComponent } from "../../../ui/button/button.component";
import { CommonModule } from '@angular/common';
import { InputContainerComponent } from "../../../ui/input-container/input-container.component";
import { DropdownComponent } from "../../../ui/dropdown/dropdown.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CreateCategoryFormComponent, CreateProductFormComponent, ButtonComponent, CommonModule, InputContainerComponent, DropdownComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: any[] = []

  constructor(private apiService: ApiService) { }


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
        console.error('Error fetching products:', error);
      }
    );
  }

}
