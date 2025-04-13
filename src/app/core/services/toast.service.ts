import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastNotification {
  message: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastNotification>();

  getToastObservable() {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, icon: string) {
    const toastNotification: ToastNotification = { message, icon };
    this.toastSubject.next(toastNotification);
  }
}
