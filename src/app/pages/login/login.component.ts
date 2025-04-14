import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterOutlet],
})
export class LoginComponent {
  constructor(private router: Router) {}

  // goToLogin(): void {
  //   this.router.navigate(['/auth/login']);
  // }
}
