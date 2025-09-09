import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTable, MatHeaderCell, MatColumnDef, MatCellDef, MatHeaderCellDef, MatCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from "@angular/material/table";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/autocomplete";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
    imports: [MatTable, MatHeaderCell, MatColumnDef, MatCellDef, MatHeaderCellDef, MatCell, MatSelect, MatOption, MatIconButton, MatIcon, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns = ['username', 'role', 'actions'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: () => console.error('Не вдалося завантажити користувачів')
    });
  }

  confirmAndChangeRole(user: any, newRole: string) {
  if (user.role !== newRole) {
    if (confirm(`Змінити роль користувача ${user.username} на ${newRole}?`)) {
      this.api.updateUser(user._id, { role: newRole }).subscribe({
        next: () => {
          user.role = newRole;
          console.log('Роль успішно змінено.');
        },
        error: () => {
          console.error('Не вдалося змінити роль');
        }
      });
    } else {
      console.log('Зміна ролі скасована користувачем.');
      const oldRole = user.role;
      user.role = 'temp_value_to_force_refresh'; 
      setTimeout(() => {
        user.role = oldRole;
      }, 0);
    }
  }
}

  deleteUser(id: string) {
    if (confirm('Ви впевнені, що хочете видалити користувача?')) {
      this.api.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: () => console.error('Не вдалося видалити користувача')
      });
    }
  }
}
