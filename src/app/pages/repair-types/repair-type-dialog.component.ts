import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-repair-type-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
      MatDialogTitle,
      MatDialogContent,
      MatLabel,
      MatInput,
      MatFormField,
      MatButton,
      MatDialogClose
],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Редагувати тип ремонту' : 'Додати тип ремонту' }}</h2>
    <form [formGroup]="form" (ngSubmit)="save()" mat-dialog-content>
      <mat-form-field>
        <mat-label>Назва</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Тривалість (днів)</mat-label>
        <input matInput type="number" formControlName="duration" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Вартість (грн)</mat-label>
        <input matInput type="number" formControlName="cost" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Примітки</mat-label>
        <textarea matInput formControlName="notes"></textarea>
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Зберегти
        </button>
        <button mat-button mat-dialog-close>Скасувати</button>
      </div>
    </form>
  `,
})
export class RepairTypeDialogComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    duration: [0, Validators.required],
    cost: [0, Validators.required],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RepairTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
