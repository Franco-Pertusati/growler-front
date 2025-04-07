import { Component } from '@angular/core';
import { TopBarComponent } from "../../ui/top-bar/top-bar.component";
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [TopBarComponent, ButtonComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  gridMode: boolean = false;
}
