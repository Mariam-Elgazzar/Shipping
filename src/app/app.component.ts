import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, SidenavComponent,HeaderComponent,SidenavComponent,CommonModule],
})
export class AppComponent {
  title = 'Shipping Management System';

  constructor(public authService: AuthService) {}
}
