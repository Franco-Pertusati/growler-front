import { Component } from '@angular/core';
import { TopBarComponent } from "../../shared/top-bar/top-bar.component";
import { ListTestComponent } from "../../shared/list-test/list-test.component";
import { ApiService } from '../../../core/services/api.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-shift-history',
  standalone: true,
  imports: [TopBarComponent, ListTestComponent],
  templateUrl: './shift-history.component.html',
  styleUrl: './shift-history.component.css'
})
export class ShiftHistoryComponent {
  users: any[] = []

  constructor(private userService: ApiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        this.toast.showToast('Error fetching user list.', 'error');
      }
    );
  }
}
