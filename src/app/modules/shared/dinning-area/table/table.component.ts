// table.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { Table } from '../../../../core/interfaces/tables';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgClass, ButtonComponent, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableData?: Table;
  @Input() selected?: boolean;
  @Output() deleteTable = new EventEmitter<void>();
  @Output() toggleShape = new EventEmitter<void>();
  @Output() renameTable = new EventEmitter<string>();

  isEditing = false;
  newName = '';
  activeShift = true;

  toggleEditState() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.newName = this.tableData?.name || '';
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
