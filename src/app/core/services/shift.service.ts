import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private apiService: ApiService, private toast: ToastService) { }

  activeShift: boolean = true


  getShiftState() {
    return this.activeShift
  }

  startShift() {
    this.activeShift = true
  }

  endShift() {
    this.activeShift = false
  }
}
