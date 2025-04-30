import { Component } from '@angular/core';
import { ShiftService } from '../../../core/services/shift.service';
import { PaymentMethods } from '../../../core/interfaces/paymentsMethods';
import { ButtonComponent } from "../../shared/button/button.component";
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent, TopBarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  paymentMethods:PaymentMethods[] = []

  constructor(private shift:ShiftService) {
    this.paymentMethods = shift.paymentMethods
  }
}
