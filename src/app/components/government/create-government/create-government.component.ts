
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GovernmentService } from '../../../services/government.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-government',
  templateUrl: './create-government.component.html',
  styleUrls: ['./create-government.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
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
          Validators.pattern(/^[a-zA-Z\s-]+$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.governmentForm.invalid) {
      this.governmentForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const governmentData = {
      name: this.governmentForm.value.name.trim(),
    };

    this.governmentService.createGovernment(governmentData).subscribe({
      next: () => {
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
        this.snackBar.open(error.message || 'Failed to create government', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  goBack(): void {
    console.log("any thing");

    this.router.navigate(['/Government/list']);
    console.log("any thing");

  }

  get nameControl() {
    return this.governmentForm.get('name');
  }
}
