import { Component } from '@angular/core';
import { ShiftService } from '../../../core/services/shift.service';
import { PaymentMethods } from '../../../core/interfaces/paymentsMethods';
import { ButtonComponent } from "../../shared/button/button.component";
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-close-table-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './close-table-dialog.component.html',
  styleUrl: './close-table-dialog.component.css'
})
export class CloseTableDialogComponent {
  paymentMethods: PaymentMethods[] = []
  selectedPM: PaymentMethods | null = null

  constructor(private shift: ShiftService, private dialogRef: DialogRef) {
    this.paymentMethods = shift.paymentMethods
  }

  selectPm(index: number) {
    this.selectedPM = this.paymentMethods[index]
  }

  confirmSell() {
    if (this.selectedPM) {
      this.dialogRef.close(this.selectedPM?.name)
    }
  }

  cancel() {
    this.dialogRef.close()
  }
}
