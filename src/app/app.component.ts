import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './modules/shared/toast/toast.component';
import { DemoBannerComponent } from "./modules/shared/demo-banner/demo-banner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ToastComponent, DemoBannerComponent]
})
export class AppComponent {
}
