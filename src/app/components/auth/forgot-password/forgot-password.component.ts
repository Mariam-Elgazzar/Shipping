import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule],
  standalone: true,
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const email = this.forgotPasswordForm.controls['email'].value;

    // In a real app, this would call an API endpoint
    setTimeout(() => {
      this.loading = false;
      this.snackBar.open(
        'Password reset instructions sent to your email',
        'Close',
        {
          duration: 5000,
        }
      );
      // Navigate to login page after showing the message
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    }, 1500);
  }
}
