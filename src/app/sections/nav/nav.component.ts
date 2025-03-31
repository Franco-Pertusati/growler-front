import { Component } from '@angular/core';
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [DropdownComponent, ButtonComponent, ThemeBtnComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  inventoryBtnList = [
    {
      label: 'Product list',
      icon: 'menu_book',
      route: 'products'
    },
    {
      label: 'Categories list',
      icon: 'menu_book',
      route: 'categories'
    },
    {
      label: 'Ingredients list',
      icon: 'menu_book',
      route: 'ingredients'
    },
  ]
}
