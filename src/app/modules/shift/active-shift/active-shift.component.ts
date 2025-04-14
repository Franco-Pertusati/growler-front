import { Component, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AditionDialogComponent } from '../adition-dialog/adition-dialog.component';
import { ThemeBtnComponent } from '../../shared/theme-btn/theme-btn.component';
import { DinningAreaComponent } from '../../shared/dinning-area/dinning-area.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { DropdownComponent } from '../../shared/dropdown/dropdown.component';
import { ToastService } from '../../../core/services/toast.service';
import { ApiService } from '../../../core/services/api.service';
import { Category, Product } from '../../../core/interfaces/products';
import { ShiftService } from '../../../core/services/shift.service';
import { Router } from '@angular/router';

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
  constructor(private apiService: ApiService, private toast: ToastService, private dialog: Dialog, private shift: ShiftService, private router: Router) { }

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

  closeShift() {
    //Para mas adelante: revisar que todas las mesas esten
    this.shift.endShift()
    this.router.navigate(['app/'])
  }
}
