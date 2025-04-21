import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  loading: boolean = false;
  email: string | null = null; // Store email from URL
  token: string | null = null; // Store token from URL

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {
    // Initialize form
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );

    // Extract email and token from query parameters
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || null;
      this.token = params['token'] || null;
    });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  passwordsMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.email && this.token) {
      this.loading = true;

      const { password } = this.resetPasswordForm.value;

      this.authService
        .resetPassword(this.email, this.token, password)
        .subscribe({
          next: () => {
            this.loading = false;
            alert('Password reset successfully!');
            this.resetPasswordForm.reset();
          },
          error: (err) => {
            this.loading = false;
            alert(err.message || 'Failed to reset password.');
          },
        });
    } else {
      alert('Invalid form or missing email/token.');
    }
  }
}
