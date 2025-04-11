import { Component } from '@angular/core';
import { NavComponent } from "../../sections/nav/nav.component";
import { ToastComponent } from "../../ui/toast/toast.component";
import { RouterOutlet } from '@angular/router';
import { DemoBannerComponent } from '../../ui/demo-banner/demo-banner.component';

@Component({
  selector: 'app-growler',
  standalone: true,
  imports: [NavComponent, ToastComponent, RouterOutlet, DemoBannerComponent],
  templateUrl: './growler.component.html',
  styleUrl: './growler.component.css'
})
export class GrowlerComponent {

}
