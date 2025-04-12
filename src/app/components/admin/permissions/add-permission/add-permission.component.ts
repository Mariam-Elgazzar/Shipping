import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

// Stub for PermissionService (replace with your actual service)
interface Permission {
  id?: string;
  name: string;
  lastUpdated: string; // ISO date string, e.g., "2025-04-13T00:00:00Z"
}

@Injectable({
  providedIn: 'root',
})
class PermissionService {
  createPermission(permission: Permission) {
    // Simulate API call (replace with real HTTP request)
    return of({ id: '123', ...permission }).pipe(
      catchError((err) => {
        console.error('Error creating permission:', err);
        throw err;
      })
    );
  }
}

@Component({
  selector: 'app-add-permission',
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
  ],
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss'],
})
export class AddPermissionComponent implements OnInit {
  permissionForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.permissionForm = this.fb.group({
      permissionName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      lastUpdated: [{ value: new Date().toISOString(), disabled: true }], // Store as ISO
    });
  }

  onSubmit(): void {
    console.log('Saving permission:', this.permissionForm.getRawValue());

    if (this.permissionForm.invalid) {
      Object.keys(this.permissionForm.controls).forEach((key) => {
        const control = this.permissionForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;

    const permission: Permission = {
      name: this.permissionForm.get('permissionName')!.value.trim(),
      lastUpdated: new Date().toISOString(), // Send ISO to backend
    };

    this.permissionService
      .createPermission(permission)
      .pipe(
        catchError((err) => {
          this.loading = false;
          this.snackBar.open('Failed to create permission. Please try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'],
          });
          return of(null);
        })
      )
      .subscribe((result) => {
        this.loading = false;
        if (result) {
          this.snackBar.open('Permission created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
          });
          this.goBack();
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/permissions']);
  }

  // Format date to DD/MM/YYYY
  formatDateToDDMMYYYY(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) {
      // Handle invalid dates, e.g., "13/04/2025"
      const parsed = this.parseDateString(date as string);
      if (parsed) return this.formatDateToDDMMYYYY(new Date(parsed));
      return 'N/A';
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Parse DD/MM/YYYY to ISO string
  private parseDateString(dateStr: string): string | null {
    const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const [_, day, month, year] = match;
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }

  // Helper methods for form validation
  get permissionNameControl() {
    return this.permissionForm.get('permissionName');
  }

  get lastUpdatedControl() {
    return this.permissionForm.get('lastUpdated');
  }
}
