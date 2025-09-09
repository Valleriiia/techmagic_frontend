import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule, MatCard, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatTableModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MachineDialogComponent } from '../machines/machine-dialog.component';
import { MatList, MatListItem } from "@angular/material/list";
import { RepairDialogComponent } from '../repairs/repair-dialog-component';
import { AdminOnlyDirective } from "../../directives/admin-only.directive";

export interface Repair {
  type: string;
  date: string;
  duration: number;
  cost: number;
  notes?: string;
}

@Component({
  selector: 'app-machine-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatCard, MatCardTitle, MatCardContent, MatButton, NgIf, MatList, NgForOf, MatListItem, DatePipe, MatCardActions, AdminOnlyDirective],
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  machine: any;
  repairs: any[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMachine(id);
    }
  }

  loadMachine(id: string) {
    this.api.getMachine(id).subscribe({
      next: (data) => {
        this.machine = data;
        this.repairs = data.repairs || [];
      },
      error: () => this.snack.open('Не вдалося завантажити станок', 'Закрити', { duration: 3000 }),
    });
  }

  editMachine() {
    const dialogRef = this.dialog.open(MachineDialogComponent, {
      width: '400px',
      data: { ...this.machine },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateMachine(this.machine._id, result).subscribe({
          next: (updated) => {
            this.machine = updated;
            this.snack.open('Станок оновлено', 'Закрити', { duration: 3000 });
          },
        });
      }
    });
  }

  deleteMachine() {
    if (confirm('Ви впевнені, що хочете видалити цей станок?')) {
      this.api.deleteMachine(this.machine._id).subscribe({
        next: () => {
          this.snack.open('Станок видалено', 'Закрити', { duration: 3000 });
          this.router.navigate(['/machines']);
        },
      });
    }
  }

  addRepair() {
    const dialogRef = this.dialog.open(RepairDialogComponent, {
      width: '400px',
      data: { machineId: this.machine._id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New repair data:', result);
        this.api.createRepair(result).subscribe({
          next: (newRepair) => {
            this.repairs.push(newRepair);
            this.snack.open('Ремонт додано', 'Закрити', { duration: 3000 });
          },
        });
      }
    });
  }
}
