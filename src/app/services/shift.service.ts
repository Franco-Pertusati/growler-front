import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor() {}

  activeShift: boolean = true
  getShiftState() {
    return this.activeShift
  }
}
