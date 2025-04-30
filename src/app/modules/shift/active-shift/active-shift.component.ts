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
import { ListedTable, Table } from '../../../core/interfaces/tables';
import { CommonModule } from '@angular/common';
import { PrintService } from '../../../core/services/print-service.service';
import { CloseTableDialogComponent } from '../close-table-dialog/close-table-dialog.component';
import { SearchProductsComponent } from "../search-products/search-products.component";

@Component({
  selector: 'app-active-shift',
  standalone: true,
  imports: [ThemeBtnComponent, DinningAreaComponent, ButtonComponent, DropdownComponent, CommonModule, SearchProductsComponent],
  templateUrl: './active-shift.component.html',
  styleUrl: './active-shift.component.css'
})
export class ActiveShiftComponent {
  constructor(private apiService: ApiService, private toast: ToastService, private dialog: Dialog, private shift: ShiftService, private router: Router, private printService: PrintService) { }

  categories: Category[] = []
  selectedTable: Table | null = null
  tables: Table[] = []
  total: number = 0

  ngOnInit() {
    const storedTables = localStorage.getItem('tables');
    if (storedTables) {
      this.tables = JSON.parse(storedTables);
    } else {
      this.getTables()
    }
    this.loadCategories()
  }

  //TODO corregir llamadas a la api
  getTables() {
    this.apiService.getTables().subscribe(
      (data: any) => {
        const rawTables = data.member;
        rawTables.forEach((rt: any) => {
          const cookedTable: Table = {
            id: rt.id,
            name: rt.name,
            position: rt.position,
            state: rt.state,
            round: rt.round,
            products: []
          }
          this.tables.push(cookedTable)
        });
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
      },
      (error) => {
        this.toast.showToast('Error fetching product list', 'error')
      }
    );
  }

  onTableSelected(table: any) {
    this.selectedTable = table;
    this.calcTableTotal(table)
  }

  calcTableTotal(table: Table) {
    this.total = 0;
    table.products.forEach(lp => {
      const subTotal = lp.product.price * lp.quantity

      this.total = this.total + subTotal;
    });
  }

  openTableMenu() {
    if (this.selectedTable && this.selectedTable.state != 3) {
      const dialogRef = this.dialog.open(AditionDialogComponent, {
        data: [this.categories, this.selectedTable]
      });


      dialogRef.closed.subscribe(result => {
        if (result) {
          this.saveTables()
          if (this.selectedTable) {
            this.calcTableTotal(this.selectedTable)
          }
        } else {
          return
        }
      });
    }
  }

  saveTables() {
    localStorage.setItem('tables', JSON.stringify(this.tables));
  }

  //TODO validar que todas las mesas esten cerradas
  closeShift() {
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
    this.saveTables()
    if (this.selectedTable) {
      this.calcTableTotal(this.selectedTable)
    }
  }

  reduceProdQuantity(prodToReduce: ListedProd) {
    if (prodToReduce.quantity === 1) {
      this.removeProduct(prodToReduce);
    } else {
      prodToReduce.quantity--;
    }
    this.saveTables()
    if (this.selectedTable) {
      this.calcTableTotal(this.selectedTable)
    }
  }

  removeProduct(productToRemove: ListedProd) {
    if (this.selectedTable) {
      this.selectedTable.products = this.selectedTable?.products.filter(
        item => item.product.id !== productToRemove.product.id
      );
      if (this.selectedTable.products.length === 0) {
        this.selectedTable.state = 1;
      }
      this.calcTableTotal(this.selectedTable)
    }
    this.saveTables()
  }

  printTable() {
    if (this.selectedTable && this.selectedTable.products.length) {
      this.selectedTable.state = 3;
      this.printTableTicket(this.selectedTable)
      this.saveTables()
    }
  }

  printTableTicket(table: Table) {
    this.printService.printTicket(table);
  }

  //TODO resetear el startTime
  closeTable(table: Table) {
    if (table.state > 2) {
      const dialogRef = this.dialog.open(CloseTableDialogComponent, {
        data: [this.categories, this.selectedTable]
      });


      dialogRef.closed.subscribe(result => {
        if (result) {
          this.createTableRegister(table, result.toString())
          if (table.state === 3) {
            table.state = 1;
            table.products = [];
          }
          this.saveTables()
        } else {
          return
        }
      });
    }
  }

  // TODO Añadir timeStamps a las mesas
  createTableRegister(table: Table, paymentMethod: string) {
    const newRegister: ListedTable = {
      id: table.id,
      startTime: 1,
      endTime: 3,
      name: table.name,
      paymentMethod: paymentMethod,
      total: this.total,
      products: table.products
    }
    this.shift.registerShift(newRegister);
    console.log(newRegister);
  }
}
