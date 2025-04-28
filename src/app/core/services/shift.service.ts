import { Injectable } from '@angular/core';
import { ListedTable, Table } from '../interfaces/tables';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  activeShift: boolean = false;
  shiftRegister: ListedTable[] = [];

  constructor() {
    this.activeShift = localStorage.getItem('activeShift') === 'true';
  }

  startShift() {
    this.activeShift = true;
    localStorage.setItem('activeShift', 'true'); // Persistir
  }

  endShift() {
    this.activeShift = false;
    localStorage.removeItem('activeShift'); // Limpiar
  }

  getShiftState() {
    return this.activeShift;
  }

  registerShift(register: ListedTable) {
    this.shiftRegister.push(register)
  }
}
