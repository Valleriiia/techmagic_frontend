import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatCellDef, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import { MatButtonModule, MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { MachineDialogComponent } from './machine-dialog.component';
import { Router } from '@angular/router';
import { AdminOnlyDirective } from "../../directives/admin-only.directive";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-machines',
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
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  displayedColumns: string[] = ['country', 'year', 'brand', 'repairs'];
  machines: any[] = [];

  constructor(private api: ApiService, private dialog: MatDialog, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadMachines();
    if (this.auth.isAdmin()) {
      this.displayedColumns.push('actions');
    }
  }

  loadMachines() {
    this.api.getMachines().subscribe({
      next: (data) => (this.machines = data),
      error: (err) => console.error(err)
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/machines', id]);
  }

  addMachine() {
    const dialogRef = this.dialog.open(MachineDialogComponent, { data: null });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.createMachine(result).subscribe({
          next: () => this.loadMachines(),
          error: (err) => console.error(err)
        });
      }
    });
  }

  editMachine(machine: any) {
    const dialogRef = this.dialog.open(MachineDialogComponent, { data: machine });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateMachine(machine._id, result).subscribe({
          next: () => this.loadMachines(),
          error: (err) => console.error(err)
        });
      }
    });
  }

  deleteMachine(id: string) {
    if (confirm('Ви впевнені, що хочете видалити цей станок?')) {
      this.api.deleteMachine(id).subscribe({
        next: () => this.loadMachines(),
        error: (err) => console.error(err)
      });
    }
  }
}
