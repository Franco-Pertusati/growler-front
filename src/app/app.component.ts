import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./sections/nav/nav.component";
import { DinningAreaComponent } from "./pages/dinning-area/dinning-area.component";
import { ManagePanelComponent } from "./sections/manage-panel/manage-panel.component";
import { ToastComponent } from "./ui/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavComponent, ToastComponent]
})
export class AppComponent {
}
