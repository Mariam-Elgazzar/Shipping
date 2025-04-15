import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/Employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class EmployeeUpdateComponent implements OnInit {
  employeeForm!: FormGroup;
  isLoading = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.loadEmployeeData();
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      branchName: ['', Validators.required],
      permission: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  loadEmployeeData(): void {
    if (!this.employeeId) return;
    this.isLoading = true;
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          branchName: employee.branchName,
          permission: employee.permission,
          status: employee.status,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading employee', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.values(this.employeeForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.employeeId) {
      const employeeData = this.employeeForm.value;
      this.updateEmployee(employeeData);
    }
  }

  updateEmployee(employee: any): void {
    if (!this.employeeId) return;
    this.isLoading = true;
    this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error updating employee', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}