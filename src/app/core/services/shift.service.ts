import { Injectable } from '@angular/core';
import { ListedTable, Table } from '../interfaces/tables';
import { PaymentMethods } from '../interfaces/paymentsMethods';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  activeShift: boolean = false;
  shiftRegister: ListedTable[] = [];
  paymentMethods: PaymentMethods[] = [
    {
      id: 1,
      name: 'Credit Card',
      aviableDays: [123456789]
    },
    {
      id: 2,
      name: 'Debit Card',
      aviableDays: [123456789]
    },
    {
      id: 3,
      name: 'Cash',
      aviableDays: [123456789]
    },
    {
      id: 4,
      name: 'Bank Transfer',
      aviableDays: [123456789]
    },
    {
      id: 5,
      name: 'Mobile Payment',
      aviableDays: [123456789]
    }
  ]

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
