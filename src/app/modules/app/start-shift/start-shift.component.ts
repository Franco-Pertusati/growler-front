import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { ShiftService } from '../../../core/services/shift.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-shift',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './start-shift.component.html',
  styleUrl: './start-shift.component.css'
})
export class StartShiftComponent {
  constructor(private shift: ShiftService, private router: Router) { }

  ngOnInit() {}

  startShift() {
    this.shift.startShift()
    this.router.navigate(['active-shift'])
  }
}
