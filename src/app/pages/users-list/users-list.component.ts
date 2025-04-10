import { Component } from '@angular/core';
import { TopBarComponent } from "../../ui/top-bar/top-bar.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { User } from '../../modules/users';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [TopBarComponent, ButtonComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  gridMode: boolean = false;

  users: User[] = [];
  selectedUsers: Set<number> = new Set<number>();

  constructor(private userService: ApiService, private toast: ToastService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleUserSelection(userId: number): void {
    if (this.isSelected(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }

  isSelected(userId: number): boolean {
    return this.selectedUsers.has(userId);
  }

  toggleSelectAll() {
    if (this.users.length === this.selectedUsers.size) {
      this.selectedUsers.clear()
    } else {
      this.users.forEach(user => {
        this.selectedUsers.add(user.id)
      });
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.member;
      },
      (error) => {
        this.toast.showToast('Error fetching user list.', 'error');
      }
    );
  }

  createUser(): void {
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    this.userService.createUser(newUser).subscribe(user => {
      console.log('Created user:', user);
      this.loadUsers(); // Refresh the list
    });
  }

  // updateUser(id: number): void {
  //   const updates = { name: 'Updated Name' };
  //   this.userService.updateUser(id, updates).subscribe(user => {
  //     console.log('Updated user:', user);
  //     this.loadUsers(); // Refresh the list
  //   });
  // }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('User deleted');
      this.loadUsers(); // Refresh the list
    });
  }
}
