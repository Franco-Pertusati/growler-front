import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/interfaces/products';

@Component({
  selector: 'app-adition-dialog',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './adition-dialog.component.html',
  styleUrl: './adition-dialog.component.css'
})
export class AditionDialogComponent {
  data = inject(DIALOG_DATA);
  categories: Category[] = this.data[0];
  selectedCategory: Category | null = null;
  gridMode: boolean = true;

  constructor(private dialogRef: DialogRef) { }

  ngOnInit() {
    this.selectCategory(this.categories[0].id);
  }

  closeDialog() {
    this.dialogRef.close()
  }

  selectCategory(catId: number) {
    if (this.categories) {
      const result = this.categories.find(c => c.id === catId)
      this.selectedCategory = result || null;
    }
  }

  addToList() { }

  removefromList() { }
}
