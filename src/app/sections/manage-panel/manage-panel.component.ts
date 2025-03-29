import { Component } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-manage-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './manage-panel.component.html',
  styleUrl: './manage-panel.component.css'
})
export class ManagePanelComponent {

}
