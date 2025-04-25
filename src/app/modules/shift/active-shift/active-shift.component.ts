import { Component, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AditionDialogComponent } from '../adition-dialog/adition-dialog.component';
import { ThemeBtnComponent } from '../../shared/theme-btn/theme-btn.component';
import { DinningAreaComponent } from '../../shared/dinning-area/dinning-area.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ToastService } from '../../../core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { Category, ListedProd, Product } from '../../../core/interfaces/products';
import { ShiftService } from '../../../core/services/shift.service';
import { Router } from '@angular/router';
import { Table } from '../../../core/interfaces/tables';
import { CommonModule } from '@angular/common';

export interface ShiftTable {
  id: number;
  name: string;
  position: number;
  state: number;
  round: boolean;
  products: string;
}

@Component({
  selector: 'app-active-shift',
  standalone: true,
  imports: [ThemeBtnComponent, DinningAreaComponent, ButtonComponent, DropdownComponent, CommonModule],
  templateUrl: './active-shift.component.html',
  styleUrl: './active-shift.component.css'
})
export class ActiveShiftComponent {
  constructor(private apiService: ApiService, private toast: ToastService, private dialog: Dialog, private shift: ShiftService, private router: Router) { }

  categories: Category[] = []
  selectedTable: Table | null = null

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.member;
      },
      (error) => {
        this.toast.showToast('Error fetching product list', 'error')
      }
    );
  }

  onTableSelected(table: any) {
    this.selectedTable = table;
    console.log(this.selectedTable)
  }

  openTableMenu() {
    if (this.selectedTable) {
      const dialogRef = this.dialog.open(AditionDialogComponent, {
        data: [this.categories, this.selectedTable]
      });
    }
  }

  searchResult: Product[] = []

  updateSearchValue(event: any) {
    const searchValue = event.target.value;
    const products = this.categories.flatMap(c => c.products ?? []);
    const result = products.filter(p =>
      p.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (result && searchValue != ' ') {
      this.searchResult = result
    }
    if (searchValue.length === 0) this.searchResult = []
  }

  closeShift() {
    //Para mas adelante: revisar que todas las mesas esten
    this.shift.endShift()
    this.router.navigate(['app/'])
  }

    addProdToList(productToAdd: Product) {
      const existingProduct = this.selectedTable?.products.find(p => p.product.id === productToAdd.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newOrder = {
          product: productToAdd,
          quantity: 1
        }
        this.selectedTable?.products.push(newOrder);
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
      if (this.selectedTable) {
        this.selectedTable.products = this.selectedTable?.products.filter(
          item => item.product.id !== productToRemove.product.id
        );
      }
    }
}
