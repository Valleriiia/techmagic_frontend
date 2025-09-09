import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'machines', loadComponent: () => import('./pages/machines/machines.component').then(m => m.MachinesComponent), canActivate: [authGuard] },
  { path: 'machines/:id', loadComponent: () => import('./pages/machine-details/machine-details.component').then(m => m.MachineDetailsComponent), canActivate: [authGuard] },
  { path: 'repair-types', loadComponent: () => import('./pages/repair-types/repair-types.component').then(m => m.RepairTypesComponent), canActivate: [authGuard] },
  { path: 'repairs', loadComponent: () => import('./pages/repairs/repairs.component').then(m => m.RepairsComponent), canActivate: [authGuard] },
  { path: 'auth', loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent) },
  { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent), canActivate: [authGuard, adminGuard] },
];
