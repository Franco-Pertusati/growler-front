import { Component } from '@angular/core';
import { Table } from '../../modules/tables';
import { TableComponent } from "./table/table.component";
import { ButtonComponent } from '../../ui/button/button.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dinning-area',
  standalone: true,
  imports: [TableComponent, ButtonComponent],
  templateUrl: './dinning-area.component.html',
  styleUrl: './dinning-area.component.css'
})
export class DinningAreaComponent {
  tables: Table[] = []
  cells = [...Array(48).keys()].map(x => x + 1);
  draggedTable: any = null;
  selectedTable: Table | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getTables()
  }

  getTables() {
    this.apiService.getTables().subscribe(
      (data: any) => {
        this.tables = data.member;
      },
      (error) => {
        console.error('Error fetching products:', error);
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
          this.changes.push(this.draggedTable)
        }
      }
    }
  }

  changes: Table[] = []

  registerChange(table: Table) {
    this.changes.push(table)
  }

  saveTables() {
    this.changes.forEach(t => {
      this.apiService.updateTable(t.id, t).subscribe({
        next: (t) => {
          console.log('Mesa actualizada:', t);
          this.changes = []
        },
        error: (err) => {
          console.error('Error al actualizar mesa:', err);
          // Revertir cambios locales si falla
          this.getTables();
        }
      });
    });
  }

  resetTables() {
    this.changes = [];
    this.getTables();
  }
}
