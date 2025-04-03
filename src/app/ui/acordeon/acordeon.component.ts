import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-acordeon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acordeon.component.html',
  styleUrl: './acordeon.component.css'
})
export class AcordeonComponent {
  @Input() label: string = 'Action';
  @Input() showLabel: boolean = true;
  @Input() icon: string = 'check'
  @Input() showIcon: boolean = true;
  @Input() style: string = '';

  isOpen: boolean = false;

  toggleState() {
    this.isOpen = !this.isOpen
  }
}
