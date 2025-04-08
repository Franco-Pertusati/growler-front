import { Component } from '@angular/core';
import { TopBarComponent } from "../../ui/top-bar/top-bar.component";
import { StatCardComponent } from "../../ui/stat-card/stat-card.component";
import { TableCardComponent } from "../../ui/table-card/table-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, StatCardComponent, TableCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
