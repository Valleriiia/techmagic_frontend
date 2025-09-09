import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { RepairTypeDialogComponent } from './repair-type-dialog.component';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButton, MatIconButton } from '@angular/material/button';
import { MatTableModule, MatTable, MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import {AdminOnlyDirective} from "../../directives/admin-only.directive";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-repair-types',
  standalone: true,
    imports: [
      CommonModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
        MatIcon,
        MatButton,
        MatTable,
        MatCellDef,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatIconButton,
        AdminOnlyDirective
    ],
  templateUrl: './repair-types.component.html',
  styleUrls: ['./repair-types.component.scss'],
})
export class RepairTypesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'duration', 'cost', 'notes'];
  repairTypes: any[] = [];

  constructor(private api: ApiService, private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadRepairTypes();
    if (this.auth.isAdmin()) {
      this.displayedColumns.push('actions');
    }
  }

  loadRepairTypes() {
    this.api.getRepairTypes().subscribe({
      next: (data) => (this.repairTypes = data),
      error: (err) => console.error('Не вдалося завантажити типи ремонтів', err),
    });
  }

  addRepairType() {
    const dialogRef = this.dialog.open(RepairTypeDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createRepairType(result).subscribe(() => this.loadRepairTypes());
      }
    });
  }

  editRepairType(rt: any) {
    const dialogRef = this.dialog.open(RepairTypeDialogComponent, {
      width: '400px',
      data: rt,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateRepairType(rt._id, result).subscribe(() => this.loadRepairTypes());
      }
    });
  }

  deleteRepairType(id: string) {
    if (confirm('Видалити цей тип ремонту?')) {
      this.api.deleteRepairType(id).subscribe(() => this.loadRepairTypes());
    }
  }
}
