import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ButtonComponent } from "../../../ui/button/button.component";
import { CommonModule } from '@angular/common';
import { InputContainerComponent } from "../../../ui/input-container/input-container.component";
import { DropdownComponent } from "../../../ui/dropdown/dropdown.component";
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CreateCategoryFormComponent } from './forms/create-category-form/create-category-form.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ButtonComponent, CommonModule, InputContainerComponent, DropdownComponent, DialogModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: any[] = []
  dialog = inject(Dialog);

  constructor(private apiService: ApiService) { }

  openDialog() {
    const dialogRef =
    this.dialog.open<string>(CreateCategoryFormComponent)
  }

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
