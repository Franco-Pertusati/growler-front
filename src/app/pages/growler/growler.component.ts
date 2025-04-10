import { Component } from '@angular/core';
import { NavComponent } from "../../sections/nav/nav.component";
import { ToastComponent } from "../../ui/toast/toast.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-growler',
  standalone: true,
  imports: [NavComponent, ToastComponent, RouterOutlet],
  templateUrl: './growler.component.html',
  styleUrl: './growler.component.css'
})
export class GrowlerComponent {

}
