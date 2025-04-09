import { Component } from '@angular/core';
import { ToastNotification, ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  private toastSubscription: Subscription | undefined;
  toastNotification: ToastNotification | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.getToastObservable().subscribe(
      (notification) => {
        this.toastNotification = notification;
        setTimeout(() => {
          this.toastNotification = null;
        }, 3000);
      }
    );
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
