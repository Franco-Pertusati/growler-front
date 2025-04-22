import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  activeShift: boolean = false;

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
}
