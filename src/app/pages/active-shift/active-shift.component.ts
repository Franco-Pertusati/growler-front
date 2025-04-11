import { Component } from '@angular/core';
import { ThemeBtnComponent } from "../../ui/theme-btn/theme-btn.component";
import { DinningAreaComponent } from "../../sections/dinning-area/dinning-area.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-active-shift',
  standalone: true,
  imports: [ThemeBtnComponent, DinningAreaComponent, ButtonComponent, DropdownComponent],
  templateUrl: './active-shift.component.html',
  styleUrl: './active-shift.component.css'
})
export class ActiveShiftComponent {
  categories = []

  constructor(private apiService: ApiService, private toast: ToastService) {}

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.member;
        console.log(this.categories)
      },
      (error) => {
        this.toast.showToast('Error fetching product list', 'error')
      }
    );
  }
}
