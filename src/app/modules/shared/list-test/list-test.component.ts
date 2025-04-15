import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-list-test',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './list-test.component.html',
  styleUrl: './list-test.component.css'
})
export class ListTestComponent {
 // Input para recibir el array con los nombres de las columnas.
  // Ejemplo: ['id', 'name', 'price', 'category']
  @Input() columns: string[] | null = null;

  // Input para recibir la lista de elementos
  @Input() data: any[] = [];

  // Arreglo que contendrá las columnas a mostrar una vez definidas o deducidas.
  displayedColumns: string[] = [];

  // Método que se invoca cada vez que cambian los Inputs.
  ngOnChanges(changes: SimpleChanges): void {
    if (this.columns && this.columns.length > 0) {
      // Si se pasa un array de columnas, lo utilizamos directamente
      this.displayedColumns = this.columns;
    } else if (this.data && this.data.length > 0) {
      // Si no se pasan columnas, inferimos las claves del primer objeto de la lista
      this.displayedColumns = Object.keys(this.data[0]);
    }
  }
}
