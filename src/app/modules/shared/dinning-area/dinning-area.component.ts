import { Component } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { LayoutChange } from './modules/changesRegister';
import { ButtonComponent } from '../button/button.component';
import { Table } from '../../../core/interfaces/tables';
import { ToastService } from '../../../core/services/toast.service';
import { ShiftService } from '../../../core/services/shift.service';
import { DiningAreaService } from '../../../core/services/dining-area.service';

@Component({
  selector: 'app-dinning-area',
  standalone: true,
  imports: [TableComponent, ButtonComponent],
  templateUrl: './dinning-area.component.html',
  styleUrl: './dinning-area.component.css'
})

export class DinningAreaComponent {
  activeShift: boolean = false;
  cells = [...Array(40).keys()].map(x => x + 1);
  draggedTable: any = null;

  constructor(private diningService: DiningAreaService, private toast: ToastService, private shift: ShiftService) {
    this.activeShift = this.shift.getShiftState()
  }

  ngOnInit() {
    this.getTables()
  }

  getTables() {
    this.diningService.getTables()
  }

  getTableAtPosition(pos: number) {
    return this.diningService.diningTables().filter(table => table.position === pos);
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

      if (this.draggedTable) { }
    }
  }
}
