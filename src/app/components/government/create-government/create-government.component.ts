import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GovernmentService } from '../../../services/government.service';

@Component({
  selector: 'app-create-government',
  templateUrl: './create-government.component.html',
  styleUrls: ['./create-government.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateGovernmentComponent implements OnInit {
  governmentForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private governmentService: GovernmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.governmentForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s-]+$/), // Only letters, spaces, and hyphens
        ],
      ],
      status: ['active', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.governmentForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.governmentForm.controls).forEach((key) => {
        const control = this.governmentForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;

    const governmentData = {
      name: this.governmentForm.value.name.trim(),
      status: this.governmentForm.value.status,
    };

    this.governmentService.createGovernment(governmentData).subscribe({
      next: (result) => {
        this.loading = false;
        this.snackBar.open('Government created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.goBack();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Failed to create government',
          'Close',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
          }
        );
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/governments']);
  }

  // Helper methods for form validation
  get nameControl() {
    return this.governmentForm.get('name');
  }

  get statusControl() {
    return this.governmentForm.get('status');
  }
}
