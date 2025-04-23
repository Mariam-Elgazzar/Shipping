import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/Employee.service';
import { OrderService, Branch } from '../../../services/order.service';
import { IAddEmployee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;
  isLoading = false;
  isLoadingBranches = false;
  errorMessage: string | null = null;
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private orderService: OrderService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBranches();
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
      address: ['', Validators.required],
      branchIds: [[], Validators.required], // Array for multiple branch IDs
      groupId: [0, [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private loadBranches(): void {
    this.isLoadingBranches = true;
    this.orderService
      .getBranches(1, 100, undefined, undefined, false)
      .subscribe({
        next: (response) => {
          this.branches = response.data.filter((branch) => !branch.isDeleted);
          this.isLoadingBranches = false;
        },
        error: (err) => {
          console.error('Error fetching branches:', err);
          this.errorMessage = 'Failed to load branches. Please try again.';
          this.isLoadingBranches = false;
        },
      });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      Object.values(this.employeeForm.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const employeeData: IAddEmployee = {
      name: this.employeeForm.get('name')?.value,
      email: this.employeeForm.get('email')?.value,
      phoneNumber: this.employeeForm.get('phoneNumber')?.value,
      address: this.employeeForm.get('address')?.value,
      branchIds: this.employeeForm.get('branchIds')?.value, // Array of numbers
      groupId: this.employeeForm.get('groupId')?.value,
      password: this.employeeForm.get('password')?.value,
    };
    console.log('Employee Data:', employeeData);

    this.employeeService.AddEmployee(employeeData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to add employee. Please try again.';
        console.error('Error creating employee:', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
