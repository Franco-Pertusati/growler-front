import { Component, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AditionDialogComponent } from '../adition-dialog/adition-dialog.component';
import { ThemeBtnComponent } from '../../shared/theme-btn/theme-btn.component';
import { DinningAreaComponent } from '../../shared/dinning-area/dinning-area.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ToastService } from '../../../core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { Category, Product, ProductInList } from '../../../core/interfaces/products';
import { ShiftService } from '../../../core/services/shift.service';
import { Router } from '@angular/router';
import { Table } from '../../../core/interfaces/tables';
import { DiningAreaService } from '../../../core/services/dining-area.service';

export interface ShiftTable {
  id: number;
  name: string;
  position: number;
  state: number;
  round: boolean;
  products: ProductInList[];
}

@Component({
  selector: 'app-active-shift',
  standalone: true,
  imports: [ThemeBtnComponent, DinningAreaComponent, ButtonComponent, DropdownComponent],
  templateUrl: './active-shift.component.html',
  styleUrl: './active-shift.component.css'
})
export class ActiveShiftComponent {
  constructor(
    private apiService: ApiService,
    private toast: ToastService,
    private dialog: Dialog,
    private shift: ShiftService,
    private router: Router,
    private diningService: DiningAreaService) {}

  searchResult: Product[] = []
  categories: Category[] = []
  selectedTable: Table | null = null

  ngOnInit() {
    this.loadCategories()
  }

  onTableSelected(event: any) {

  }

  openTableMenu() {
    if (this.selectedTable) {
      const dialogRef = this.dialog.open(AditionDialogComponent, {
        data: [this.categories, this.selectedTable.id]
      });
    }
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
    //Para mas adelante: revisar que todas las mesas esten cerradas
    this.shift.endShift()
    this.router.navigate(['app/'])
  }

  addItem(prodToAdd: Product) {
    const repeatedProd = this.selectedTable?.products.find(i => i.product.id === prodToAdd.id)

    if (repeatedProd) {
      repeatedProd.quantity++
    } else {
      this.selectedTable?.products.push(
        {
          product: prodToAdd,
          quantity: 1
        }
      )
    }
  }

  removeItem(prodToDelete: ProductInList) {
    if (this.selectedTable) {
      const result = this.selectedTable?.products.filter(i => i.product.id !== prodToDelete.product.id);

      if (result) {
        this.selectedTable.products = result;
      }
    }
  }

  susbstractItem(prodToSubstract: ProductInList) {
    if (prodToSubstract.quantity > 1) {
      prodToSubstract.quantity--
    } else {
      this.removeItem(prodToSubstract)
    }
  }
}
