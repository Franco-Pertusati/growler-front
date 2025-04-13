import { Component, Injectable } from '@angular/core';
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";
import { DinningAreaComponent } from "../../sections/dinning-area/dinning-area.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { Dialog } from '@angular/cdk/dialog';
import { AditionDialogComponent } from './adition-dialog/adition-dialog.component';
import { Category, Product } from '../../modules/products';

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
  imports: [ThemeBtnComponent, DinningAreaComponent, ButtonComponent, DropdownComponent],
  templateUrl: './active-shift.component.html',
  styleUrl: './active-shift.component.css'
})
export class ActiveShiftComponent {
  constructor(private apiService: ApiService, private toast: ToastService, private dialog: Dialog) { }

  tablesShift: ShiftTable[] = []
  selectedTable: ShiftTable | null = null
  categories: Category[] = []

  ngOnInit() {
    this.getTables()
    this.loadCategories()
  }

  getTables() {
    this.apiService.getTables().subscribe(
      (data: any) => {
        this.tablesShift = data.member;
      },
      (error) => {
        this.toast.showToast('Error fetching the tables', 'error')
      }
    );
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

  onTableSelected(event: any) {
    const selectedTableId = event;

    const result = this.tablesShift.find(t => t.id === selectedTableId)
    if (result) {
      this.selectedTable = result;
    }
  }

  // Agregar condicional de mesa seleccionada
  openCreateProdDialog() {
    if (this.selectedTable) {
      const dialogRef = this.dialog.open(AditionDialogComponent, {
        data: [this.categories, this.selectedTable.name]
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
}
