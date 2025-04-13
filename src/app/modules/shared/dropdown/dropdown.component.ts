import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
    @Input() label: string = 'Action';
    @Input() showLabel: boolean = true;
    @Input() icon: string = 'check'
    @Input() showIcon: boolean = true;
    @Input() style: string = '';

    isOpen: boolean = false;

    openDropdown(): void {
      this.isOpen = true;
    }

    closeDropdown(): void {
      this.isOpen = false;
    }
}
