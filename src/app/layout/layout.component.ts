import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule, MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatListModule, MatNavList, MatListItem } from '@angular/material/list';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    NgIf,
      RouterLink,
      MatSidenavContainer,
      MatSidenav,
      MatNavList,
      MatListItem,
      MatSidenavContent,
      MatToolbar,
      MatButton,
      RouterOutlet
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    if (confirm('Ви впевнені, що хочете вийти?')) {
      this.auth.logout();
      this.router.navigate(['/auth']);
    }
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
