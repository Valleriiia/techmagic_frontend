import { NgForOf, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { MatOption } from "@angular/material/core";

@Component({
  selector: 'app-repair-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatInput,
    MatButton,
      NgIf
],
  template: `
    <h2 mat-dialog-title>{{ data?._id ? 'Редагувати ремонт' : 'Додати ремонт' }}</h2>

    <form [formGroup]="form" (ngSubmit)="save()" mat-dialog-content>

      <!-- Machine select -->
      <mat-form-field *ngIf="!data?.machineId">
        <mat-label>Станок</mat-label>
        <mat-select formControlName="machine" required>
          <mat-option *ngFor="let m of machines" [value]="m._id">
            {{ m.brand }} ({{ m.year }})
          </mat-option>
        </mat-select>
      </mat-form-field>

      <input *ngIf="data?.machineId" type="hidden" formControlName="machine" />

      <!-- Repair type -->
      <mat-form-field>
        <mat-label>Тип ремонту</mat-label>
        <mat-select formControlName="repairType" required>
          <mat-option *ngFor="let type of repairTypes" [value]="type._id">
            {{ type.name }} ({{ type.cost }} грн)
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Дата</mat-label>
        <input matInput formControlName="startDate" type="date" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Примітки</mat-label>
        <textarea matInput formControlName="notes"></textarea>
      </mat-form-field>

      <div class="actions" style="margin-top: 12px; display: flex; gap: 8px;">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Зберегти
        </button>
        <button mat-button type="button" (click)="cancel()">Скасувати</button>
      </div>
    </form>
  `
})
export class RepairDialogComponent implements OnInit {
  private today = new Date().toISOString().slice(0, 10);

  form = this.fb.group({
    machine: ['', Validators.required],
    repairType: ['', Validators.required],
    startDate: [this.today, Validators.required],
    notes: [''],
  });

  machines: any[] = [];
  repairTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialogRef: MatDialogRef<RepairDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.machineId) {
      this.form.patchValue({ machine: data.machineId });
    }
    if (data?._id) {
      this.form.patchValue({
      machine: this.data.machine?._id || this.data.machine, 
      repairType: this.data.repairType?._id || this.data.repairType,
      startDate: this.data.startDate ? this.data.startDate.slice(0, 10) : this.today,
      notes: this.data.notes || ''
    });
    }
  }

  ngOnInit() {
    if (!this.data?.machineId) {
      this.api.getMachines().subscribe({
        next: (machines) => (this.machines = machines),
      });
    }

    this.api.getRepairTypes().subscribe({
      next: (types) => (this.repairTypes = types),
      error: () => console.error('Не вдалося завантажити типи ремонтів'),
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
