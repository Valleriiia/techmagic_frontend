import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-machine-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
      MatDialogTitle,
      MatFormField,
      MatDialogContent,
      MatLabel,
      MatInput,
      MatButton,
      MatDialogClose
],
  template: `
    <h2 mat-dialog-title>
      {{ data ? 'Редагувати станок' : 'Додати станок' }}
    </h2>
    <form [formGroup]="form" (ngSubmit)="onSave()" mat-dialog-content>
      <mat-form-field>
        <mat-label>Країна</mat-label>
        <input matInput formControlName="country" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Рік</mat-label>
        <input matInput type="number" formControlName="year" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Марка</mat-label>
        <input matInput formControlName="brand" />
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Зберегти
        </button>
        <button mat-button mat-dialog-close>Скасувати</button>
      </div>
    </form>
  `
})
export class MachineDialogComponent {
  form = this.fb.group({
    country: ['', Validators.required],
    year: ['', Validators.required],
    brand: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MachineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
