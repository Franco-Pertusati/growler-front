import { Component } from '@angular/core';
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";
import { DinningAreaComponent } from '../../shared/dinning-area/dinning-area.component';

@Component({
  selector: 'app-dinning-settings',
  standalone: true,
  imports: [TopBarComponent, DinningAreaComponent],
  templateUrl: './dinning-settings.component.html',
  styleUrl: './dinning-settings.component.css'
})
export class DinningSettingsComponent {

}
