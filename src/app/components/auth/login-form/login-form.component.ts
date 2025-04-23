import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  returnUrl = '/';
  hidePassword = true;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Changed to email with email validator
      password: ['', Validators.required],
      rememberMe: [false],
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const loginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('user_data', JSON.stringify(response));

        const userData = response;

        switch (userData.role) {
          case 'Admin':
            this.router.navigate(['/dashboard']);
            break;
          case 'Employee':
            this.router.navigate(['/dashboard']);
            break;
          case 'Merchant':
            this.router.navigate(['/dashboard']);
            break;
          case 'Delivary':
            this.router.navigate(['/delivery']);
            break;
          default:
            this.router.navigate(['/unauthorized']);
        }
      }
      ,
      error: (error) => {
        this.errorMessage = error.message || 'Login failed';
        this.loading = false;
        this.router.navigate(['/unauthorized']);
      },
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
