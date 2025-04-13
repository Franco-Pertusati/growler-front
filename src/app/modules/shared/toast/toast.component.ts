import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastNotification, ToastService } from '../../../core/services/toast.service';

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
  isVisible: boolean = false;
  isHiding: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.getToastObservable().subscribe(
      (notification) => {
        this.toastNotification = notification;
        this.isHiding = false;
        this.isVisible = true;

        setTimeout(() => {
          this.isHiding = true;
          setTimeout(() => {
            this.toastNotification = null;
            this.isVisible = false;
          }, 200); // Tiempo para la animación de salida
        }, 3000); // Tiempo que permanece visible
      }
    );
  }

  ngOnDestroy() {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }
}
