import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employees.service';
import { Role } from '../../../models/user.model';
import { Employee, Branch } from '../../../models/employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
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
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  loadingData = true;
  branches: Branch[] = [];
  roles: Role[] = [];
  hidePassword = true;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.employeeId = this.route.snapshot.paramMap.get('id');

    if (!this.employeeId) {
      this.snackBar.open('Employee ID is missing', 'Close', { duration: 3000 });
      this.goBack();
      return;
    }

    this.loadEmployeeData();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]], // Password is optional for updates
      address: ['', [Validators.required, Validators.minLength(5)]],
      branchId: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  loadEmployeeData(): void {
    this.loadingData = true;

    forkJoin({
      branches: this.employeeService.getBranches(),
      roles: this.employeeService.getRoles(),
    })
      .pipe(
        switchMap((result) => {
          this.branches = result.branches;
          this.roles = result.roles;
          return this.employeeService.getEmployee(this.employeeId!);
        })
      )
      .subscribe({
        next: (employee) => {
          this.employeeForm.patchValue({
            name: employee.name,
            phone: employee.phone,
            email: employee.email,
            address: employee.address,
            branchId: employee.branchId,
            roleId: employee.roleId,
          });
          this.loadingData = false;
        },
        error: (error) => {
          this.snackBar.open('Failed to load employee data: ' + error.message, 'Close', {
             duration: 5000,
          });
          this.loadingData = false;
          this.goBack();
        },
      });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const employeeData = { ...this.employeeForm.value };

    if (!employeeData.password) {
      delete employeeData.password;
    }

    this.employeeService.updateEmployee(this.employeeId!, employeeData).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Employee updated successfully!', 'Close', {
          duration: 3000,
        });
        this.goBack();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(error.message || 'Failed to update employee', 'Close', {
          duration: 5000,
        });
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  get nameControl() {
    return this.employeeForm.get('name');
  }

  get phoneControl() {
    return this.employeeForm.get('phone');
  }

  get emailControl() {
    return this.employeeForm.get('email');
  }

  get passwordControl() {
    return this.employeeForm.get('password');
  }

  get addressControl() {
    return this.employeeForm.get('address');
  }

  get branchIdControl() {
    return this.employeeForm.get('branchId');
  }

  get roleIdControl() {
    return this.employeeForm.get('roleId');
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
