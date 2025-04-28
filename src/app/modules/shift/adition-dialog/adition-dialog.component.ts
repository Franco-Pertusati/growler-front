import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Category, ListedProd, Product } from '../../../core/interfaces/products';
import { Table } from '../../../core/interfaces/tables';
import { ShiftService } from '../../../core/services/shift.service';

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
  selectedTable: Table = this.data[1];
  order: ListedProd[] = []
  selectedCategory: Category | null = null;
  gridMode: boolean = true;

  constructor(private dialogRef: DialogRef, private shift:ShiftService) { }

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

  addProdToList(productToAdd: Product) {
    const existingProduct = this.order.find(p => p.product.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const newOrder = {
        product: productToAdd,
        quantity: 1
      }
      this.order.push(newOrder);
    }
  }

  reduceProdQuantity(prodToReduce: ListedProd) {
    if (prodToReduce.quantity === 1) {
      this.removeProduct(prodToReduce);
    } else {
      prodToReduce.quantity--;
    }
  }

  removeProduct(productToRemove: ListedProd) {
    this.order = this.order.filter(
      item => item.product.id !== productToRemove.product.id
    );
  }

  confirmOrder() {
    if (this.order.length === 0) {
      this.closeDialog();
      return;
    }

    this.order.forEach(lp => {
      const existingLp = this.selectedTable.products.find(tableLp => tableLp.product.id === lp.product.id)
      if (existingLp) {
        existingLp.quantity++
      } else {
        this.selectedTable.products.push(lp);
      }
    });

    this.selectedTable.state = 2
    this.dialogRef.close(this.selectedTable)
  }
}
