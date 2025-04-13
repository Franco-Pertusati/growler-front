import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { LayoutChange } from './modules/changesRegister';
import { ButtonComponent } from '../button/button.component';
import { Table } from '../../../core/interfaces/tables';
import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { ShiftService } from '../../../core/services/shift.service';

@Component({
  selector: 'app-dinning-area',
  standalone: true,
  imports: [TableComponent, ButtonComponent],
  templateUrl: './dinning-area.component.html',
  styleUrl: './dinning-area.component.css'
})

export class DinningAreaComponent {
  activeShift: boolean = false;
  tables: Table[] = []
  cells = [...Array(40).keys()].map(x => x + 1);
  draggedTable: any = null;
  selectedTable: Table | null = null;
  @Output() tableSelectedEm = new EventEmitter<number | null>();

  constructor(private apiService: ApiService, private toast: ToastService, private shift: ShiftService) {
    this.activeShift = this.shift.getShiftState()
  }

  ngOnInit() {
    this.getTables()
  }

  selectTable(table: Table | null) {
    this.tableSelectedEm.emit(table?.id);
  }

  //CORREJIR SUSCRIBE
  getTables() {
    this.apiService.getTables().subscribe(
      (data: any) => {
        this.tables = data.member;
      },
      (error) => {
        this.toast.showToast('Error fetching the tables', 'error')
      }
    );
  }

  getTableAtPosition(pos: number) {
    return this.tables.filter(table => table.position === pos);
  }

  onDragStart(event: DragEvent, table: any) {
    this.draggedTable = table;
    event.dataTransfer?.setData('text/plain', table.id.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragEnter(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cell')) {
      target.classList.add('hover');
    }
  }

  onDragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cell')) {
      target.classList.remove('hover');
    }
  }

  onDrop(event: DragEvent, cellPos: number) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.classList.contains('cell')) {
      target.classList.remove('hover');

      if (this.draggedTable) {
        const existingTable = this.tables.find(t => t.position === cellPos && t.id !== this.draggedTable.id);
        if (!existingTable) {
          this.draggedTable.position = cellPos;
          this.registerChange({ table: this.draggedTable, action: 'update' })
        }
      }
    }
  }

  //OJO SIN IMPLEMENTAR
  createTable() {
    const table = {
      id: 3,
      name: 'NewTable',
      position: 1,
      state: 3,
      round: false
    }
    this.apiService.createTable(table).subscribe({
      next: () => {
        console.log("Table created")
      },
      error: (err) => {
        console.error('Error al actualizar mesa:', err);
      }
    });
  }

  deleteTable() {
    if (this.selectedTable) {
      this.registerChange({ table: this.selectedTable, action: 'delete' })
      const tableId = this.selectedTable.id
      this.tables = this.tables.filter(t => t.id !== tableId)
    }
  }

  toggleTableShape() {
    if (this.selectedTable) {
      this.selectedTable.round = !this.selectedTable.round;
      this.registerChange({ table: this.selectedTable, action: 'update' })
    }
  }

  renameTable() {
    if (this.selectedTable) {
      this.registerChange({ table: this.selectedTable, action: 'update' })
    }
  }

  layoutChanges: LayoutChange[] = []

  registerChange(change: LayoutChange) {
    const duplicateChangeID = this.layoutChanges.findIndex(c => c.table.id === change.table.id);

    if (duplicateChangeID !== -1) {
      this.layoutChanges.splice(duplicateChangeID, 1);
    }

    this.layoutChanges.push(change);
  }

  saveTables() {
    if (this.layoutChanges.length > 0) {
      this.layoutChanges.forEach(change => {
        switch (change.action) {

          case 'create':
            console.log("create sin implementar")
            break;

          case 'delete':
            this.apiService.deleteTable(change.table.id).subscribe({
              next: () => {
                console.log(`${change.table.name} deleted`)
              },
              error: (err) => {
                console.error('Error al actualizar mesa:', err);
              }
            });
            break

          case 'update':
            this.apiService.updateTable(change.table.id, change.table).subscribe({
              next: () => {
                console.log(`${change.table.name} updated`)
              },
              error: (err) => {
                console.error('Error al actualizar mesa:', err);
              }
            });
            break

          default:
            break;
        }
      });
      this.layoutChanges = []
      this.toast.showToast('Layout updated', 'check')
    }
  }

  resetTables() {
    this.layoutChanges = []
    this.getTables()
  }

  handleDeleteTable(table: Table) {
    this.selectedTable = table;
    this.deleteTable();
  }

  handleToggleTableShape(table: Table) {
    this.selectedTable = table;
    this.toggleTableShape();
  }

  handleRenameTable(newName: string) {
    if (this.selectedTable) {
      this.selectedTable.name = newName;
      this.registerChange({ table: this.selectedTable, action: 'update' });
    }
  }
}
