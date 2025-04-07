import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { InputComponent } from "../../ui/form/input/input.component";
import { TopBarComponent } from "../../ui/top-bar/top-bar.component";
import { StatCardComponent } from "../../ui/stat-card/stat-card.component";
import { TableCardComponent } from "../../ui/table-card/table-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, ButtonComponent, StatCardComponent, TableCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
