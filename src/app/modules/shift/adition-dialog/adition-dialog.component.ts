import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Category, Product, ProductInList } from '../../../core/interfaces/products';
import { DiningAreaService } from '../../../core/services/dining-area.service';

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
  itemsList: ProductInList[] = []

  constructor(private dialogRef: DialogRef, private diningService: DiningAreaService) { }

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

  addItem(prodToAdd: Product) {
    const repeatedProd = this.itemsList.find(i => i.product.id === prodToAdd.id)

    if (repeatedProd) {
      repeatedProd.quantity++
    } else {
      this.itemsList.push(
        {
          product: prodToAdd,
          quantity: 1
        }
      )
    }
  }

  removeItem(prodToDelete: ProductInList) {
    const result = this.itemsList.filter(i => i.product.id !== prodToDelete.product.id);

    if (result) {
      this.itemsList = result;
    }
  }

  susbstractItem(prodToSubstract: ProductInList) {
    if (prodToSubstract.quantity > 1) {
      prodToSubstract.quantity--
    } else {
      this.removeItem(prodToSubstract)
    }
  }

  confirmOrder() {
    this.diningService.addOrder(this.data[1], this.itemsList)
    this.closeDialog()
  }
}
