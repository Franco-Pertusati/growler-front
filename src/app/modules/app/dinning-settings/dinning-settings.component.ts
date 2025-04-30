import { Component } from '@angular/core';
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";
import { DinningAreaComponent } from '../../shared/dinning-area/dinning-area.component';
import { Table } from '../../../core/interfaces/tables';
import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-dinning-settings',
  standalone: true,
  imports: [TopBarComponent, DinningAreaComponent],
  templateUrl: './dinning-settings.component.html',
  styleUrl: './dinning-settings.component.css'
})
export class DinningSettingsComponent {
  tables: Table[] = []

  constructor(private apiService: ApiService, private toast: ToastService) {}

  ngOnInit() {
    this.getTables()
  }

  //TODO corregir llamadas a la api
  getTables() {
    this.apiService.getTables().subscribe(
      (data: any) => {
        const rawTables = data.member;
        rawTables.forEach((rt: any) => {
          const cookedTable: Table = {
            id: rt.id,
            name: rt.name,
            position: rt.position,
            state: rt.state,
            round: rt.round,
            products: []
          }
          this.tables.push(cookedTable)
        });
      },
      (error) => {
        this.toast.showToast('Error fetching the tables', 'error')
      }
    );
  }
}
