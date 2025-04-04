import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() name:string | null = null;
  @Input() error:string | null = null;
  @Input() label:string = 'label';
  @Input() placeholder:string = 'Placeholder';
}
