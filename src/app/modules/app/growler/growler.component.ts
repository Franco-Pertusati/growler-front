import { Component } from '@angular/core';
import { ToastComponent } from "../../shared/toast/toast.component";
import { RouterOutlet } from '@angular/router';
import { DemoBannerComponent } from '../../shared/demo-banner/demo-banner.component';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-growler',
  standalone: true,
  imports: [NavComponent, RouterOutlet, DemoBannerComponent],
  templateUrl: './growler.component.html',
  styleUrl: './growler.component.css'
})
export class GrowlerComponent {

}
