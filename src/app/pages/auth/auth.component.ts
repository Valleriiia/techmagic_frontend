import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTabsModule, MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormFieldModule, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatButtonModule, MatIconButton, MatButton } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
      MatTabGroup,
      MatTab,
      MatFormField,
      MatLabel,
      MatInput,
      MatIconButton,
      MatIcon,
      MatSuffix,
      MatButton
],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  hidePassword = true;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.auth.setToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Невірний email або пароль');
        }
      });
    }
  }

  onRegister() {
  if (this.registerForm.valid) {
    const { username, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.snackBar.open('Паролі не співпадають', 'Закрити', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    const newUser = {
      username,
      password,
      role: 'user'
    };

    this.api.register(newUser).subscribe({
      next: (res) => {
        console.log('Register success:', res);
        this.api.login({ username, password }).subscribe({
          next: (loginRes) => {
            this.auth.setToken(loginRes.token);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Auto login error:', err);
            this.snackBar.open('Помилка при автоматичному вході', 'Закрити', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          }
        });
      },
      error: (err) => {
        console.error('Register error:', err);
        if (err.status === 409) { 
          this.snackBar.open('Користувач з таким ім\'ям вже існує', 'Закрити', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        } else {
          this.snackBar.open('Помилка при реєстрації. Спробуйте пізніше', 'Закрити', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }
      }
    });
  }
}
}
