import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
    imports: [MatCard, MatCardContent, MatIcon]
})
export class DashboardComponent implements OnInit {
  stats = {
    machines: 0,
    repairs: 0,
    users: 0,
    repairTypes: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.api.getMachines().subscribe({
      next: (data: any[]) => (this.stats.machines = data.length),
      error: () => console.error('Не вдалося отримати станки')
    });

    this.api.getRepairTypes().subscribe({
      next: (data: any[]) => (this.stats.repairTypes = data.length),
      error: () => console.error('Не вдалося отримати типи ремонтів')
    });

    this.api.getUsers().subscribe({
      next: (data: any[]) => (this.stats.users = data.length),
      error: () => console.error('Не вдалося отримати користувачів')
    });

    this.api.getRepairs().subscribe({
      next: (data: any[]) => (this.stats.repairs = data.length),
      error: () => console.error('Не вдалося отримати ремонти')
    });
  }
}
