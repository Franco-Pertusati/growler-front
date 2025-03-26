import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import { ButtonComponent } from "./ui/button/button.component";
import { NavComponent } from "./sections/nav/nav.component";
import { DinningAreaComponent } from "./sections/dinning-area/dinning-area.component";
import { ManagePanelComponent } from "./sections/manage-panel/manage-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent, DinningAreaComponent, ManagePanelComponent]
})
export class AppComponent {
}
