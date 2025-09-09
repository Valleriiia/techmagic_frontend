import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { RepairDialogComponent } from './repair-dialog-component';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from "@angular/common";
import { AdminOnlyDirective } from "../../directives/admin-only.directive";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-repairs',
  standalone: true,
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.scss'],
    imports: [MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatCellDef, MatIcon, DatePipe, MatIconButton, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, AdminOnlyDirective]
})
export class RepairsComponent implements OnInit {
  displayedColumns: string[] = ['machine', 'repairType', 'startDate', 'duration', 'cost', 'notes'];
  repairs: any[] = [];

  constructor(private api: ApiService, private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadRepairs();
    if (this.auth.isAdmin()) {
      this.displayedColumns.push('actions');
    }
  }

  loadRepairs() {
    this.api.getRepairs().subscribe({
      next: (data) => (this.repairs = data),
      error: (err) => console.error('Не вдалося завантажити ремонти', err),
    });
  }

  addRepair() {
    const dialogRef = this.dialog.open(RepairDialogComponent, {
      width: '500px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createRepair(result).subscribe(() => this.loadRepairs());
      }
    });
  }

  editRepair(r: any) {
    const dialogRef = this.dialog.open(RepairDialogComponent, {
      width: '500px',
      data: r,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateRepair(r._id, result).subscribe(() => this.loadRepairs());
      }
    });
  }

  deleteRepair(id: string) {
    if (confirm('Видалити цей ремонт?')) {
      this.api.deleteRepair(id).subscribe(() => this.loadRepairs());
    }
  }
}
