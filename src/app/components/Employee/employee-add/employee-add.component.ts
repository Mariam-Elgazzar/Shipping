// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { EmployeeService } from '../../../services/Employee.service';

// @Component({
//   selector: 'app-employee-add',
//   templateUrl: './employee-add.component.html',
//   styleUrls: ['./employee-add.component.scss'],
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, RouterModule],
// })
// export class EmployeeAddComponent implements OnInit {
//   employeeForm!: FormGroup;
//   isLoading = false;

//   constructor(
//     private fb: FormBuilder,
//     private employeeService: EmployeeService,
//     public router: Router
//   ) {}

//   ngOnInit(): void {
//     this.initForm();
//   }

//   private initForm(): void {
//     this.employeeForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
//       branchName: ['', Validators.required],
//       permission: ['', Validators.required],
//       status: ['', Validators.required],
//     });
//   }

//   onSubmit(): void {
//     if (this.employeeForm.invalid) {
//       Object.values(this.employeeForm.controls).forEach((control) => control.markAsTouched());
//       return;
//     }

//     const employeeData = this.employeeForm.value;
//     this.createEmployee(employeeData);
//   }

//   createEmployee(employee: any): void {
//     this.isLoading = true;
//     this.employeeService.createEmployee(employee).subscribe({
//       next: () => {
//         this.isLoading = false;
//         this.router.navigate(['/employees']);
//       },
//       error: (err) => {
//         console.error('Error creating employee', err);
//         this.isLoading = false;
//       },
//     });
//   }

//   cancel(): void {
//     this.router.navigate(['/employees']);
//   }
// }
