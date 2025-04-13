import { Component } from '@angular/core';
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";
import { StatCardComponent } from "../../shared/stat-card/stat-card.component";
import { TableCardComponent } from "../../shared/table-card/table-card.component";
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, StatCardComponent, TableCardComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
