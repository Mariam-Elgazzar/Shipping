import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatIcon, MatNavList, MatDialogModule, MatToolbar, MatMenuModule],
})
export class HeaderComponent {
  constructor(private router: Router, public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
