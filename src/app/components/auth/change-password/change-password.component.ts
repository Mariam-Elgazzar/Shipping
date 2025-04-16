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
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
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
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  hideOldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.changePasswordForm = this.fb.group(
      {
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'oldpassword') {
      this.hideOldPassword = !this.hideOldPassword;
    } else if (field === 'password') {
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
    if (this.changePasswordForm.valid) {
      this.loading = true;
      const { oldpassword, password } = this.changePasswordForm.value;

      this.authService.changePassword(oldpassword, password).subscribe({
        next: () => {
          this.loading = false;
          alert('Password changed successfully!');
          this.changePasswordForm.reset();
          this.router.navigate(['']); // Redirect to profile or desired route
        },
        error: (err) => {
          this.loading = false;
          alert(err.message || 'Failed to change password.');
        },
      });
    }
  }
}
