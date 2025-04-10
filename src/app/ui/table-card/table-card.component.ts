import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [],
  templateUrl: './table-card.component.html',
  styleUrl: './table-card.component.css'
})
export class TableCardComponent {
  @Input() title: string = 'Title'
  @Input() list: Array<any> = []
}
