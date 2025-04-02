import { Component } from '@angular/core';
import { Table } from '../../modules/tables';
import { TableComponent } from "./table/table.component";

@Component({
  selector: 'app-dinning-area',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './dinning-area.component.html',
  styleUrl: './dinning-area.component.css'
})
export class DinningAreaComponent {
  tables: Table[] = [
    {
      id: 1,
      name: "Mesa 1",
      products: [],  // No hay productos
      total: 0,
      state: "empty",
      startTime: Date.now(), // Hora de inicio actual (timestamp)
      waiter: "Camarero 1",
      guestCount: 0,
      pos: 1,
    },
    {
      id: 2,
      name: "Mesa 2",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 2",
      guestCount: 0,
      pos: 2,
    },
    {
      id: 3,
      name: "Mesa 3",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 3",
      guestCount: 0,
      pos: 3,
    },
    {
      id: 4,
      name: "Mesa 4",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 4",
      guestCount: 0,
      pos: 4,
    },
    {
      id: 5,
      name: "Mesa 5",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 5",
      guestCount: 0,
      pos: 5,
    },
    {
      id: 6,
      name: "Mesa 6",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 6",
      guestCount: 0,
      pos: 6,
    },
    {
      id: 7,
      name: "Mesa 7",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 7",
      guestCount: 0,
      pos: 7,
    },
    {
      id: 8,
      name: "Mesa 8",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 8",
      guestCount: 0,
      pos: 8,
    },
    {
      id: 9,
      name: "Mesa 9",
      products: [],
      total: 0,
      state: "empty",
      startTime: Date.now(),
      waiter: "Camarero 9",
      guestCount: 0,
      pos: 9,
    },
    {
      id: 10,
      name: "Mesa 10",
      products: [],
      total: 0,
      state: "occupied",
      startTime: Date.now(),
      waiter: "Camarero 10",
      guestCount: 0,
      pos: 10,
    }
  ]
  cells = [...Array(48).keys()].map(x => x + 1);
  draggedTable: any = null;

  getTableAtPosition(pos: number) {
    return this.tables.filter(table => table.pos === pos);
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
        const existingTable = this.tables.find(t => t.pos === cellPos && t.id !== this.draggedTable.id);
        this.saveTables()
        if (!existingTable) {
          this.draggedTable.pos = cellPos;
        }
      }
    }
  }

  saveTables() {
    // Aquí puedes implementar la lógica para guardar en una API
    console.log('Mesas actualizadas:', this.tables);
  }
}
