import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GovernmentService } from '../../../services/government.service';
import { UpdateGovernmentRequest } from '../../../models/government.interface';

@Component({
  selector: 'app-edit-government',
  templateUrl: './government-update.component.html',
  styleUrls: ['./government-update.component.scss'],
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
export class EditGovernmentComponent implements OnInit {
  governmentForm!: FormGroup;
  loading = false;
  governmentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private governmentService: GovernmentService
  ) {}

  ngOnInit(): void {
    this.governmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadGovernment();
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
      isDeleted: [false],
    });
  }

  loadGovernment(): void {
    this.governmentService.getGovernmentDetails(this.governmentId).subscribe({
      next: (government) => {
        this.governmentForm.patchValue({
          name: government.name,
          isDeleted: government.isDeleted,
        });
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Failed to load government', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  onSubmit(): void {
    if (this.governmentForm.invalid) {
      this.governmentForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const governmentData: UpdateGovernmentRequest = {
      id: this.governmentId,
      name: this.governmentForm.value.name.trim(),
      isDeleted: this.governmentForm.value.isDeleted,
    };

    this.governmentService.updateGovernment(governmentData).subscribe({
      next: () => {

        this.loading = false;
        this.snackBar.open('Government updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.goBack();
        console.log("good");

      },
      error: (error) => {

        this.loading = false;
        this.snackBar.open('Government updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.goBack();
        console.log("not good");

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

  get isDeletedControl() {
    return this.governmentForm.get('isDeleted');
  }
}
