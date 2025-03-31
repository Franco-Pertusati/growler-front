import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})

export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string = 'Action';
  @Input() showLabel: boolean = true;
  @Input() icon: string = 'check'
  @Input() showIcon: boolean = true;
  @Input() notifications: number = 0;
  @Input() style: string = '';
  @Input() disabled = false;
  @Input() accent = false;
  @Input() active = false;
  @Input() routerLink: string | null = null;
}
