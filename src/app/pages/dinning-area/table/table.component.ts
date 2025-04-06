// table.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from '../../../modules/tables';
import { NgClass } from '@angular/common';
import { ButtonComponent } from "../../../ui/button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgClass, ButtonComponent, FormsModule], // Añadir FormsModule
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableData?: Table;
  @Input() selected?: boolean;
  @Output() deleteTable = new EventEmitter<void>();
  @Output() toggleShape = new EventEmitter<void>();
  @Output() renameTable = new EventEmitter<string>(); // Cambiado a emitir el nuevo nombre

  isEditing = false;
  newName = ''; // Variable para almacenar el nuevo nombre

  toggleEditState() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.newName = this.tableData?.name || ''; // Inicializar con el nombre actual
    }
  }

  onDelete() {
    this.deleteTable.emit();
  }

  onToggleShape() {
    this.toggleShape.emit();
  }

  onSaveName() {
    if (this.newName.trim() && this.newName !== this.tableData?.name) {
      this.renameTable.emit(this.newName);
    }
    this.isEditing = false;
  }
}
