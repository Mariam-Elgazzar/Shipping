import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component,  OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from "../../../services/employees.service"
import { Role } from "../../../models/user.model"
import { Branch } from "../../../models/employee.model"
import { forkJoin } from "rxjs"
@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.scss"],
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
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup
  loading = false
  branches: Branch[] = []
  roles: Role[] = []
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.loadFormData()
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100) ,Validators.pattern(/^[a-zA-Z\s-]+$/)]],
      phone: ["", [Validators.required,Validators.minLength(11),Validators.maxLength(11), Validators.pattern(/^\+?[0-9\s\-$$$$]+$/)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      branchId: ["", Validators.required],
      roleId: ["", Validators.required],
    })
  }

  loadFormData(): void {
    this.loading = true

    // Load branches and roles in parallel
    forkJoin({
      branches: this.employeeService.getBranches(),
      roles: this.employeeService.getRoles(),
    }).subscribe({
      next: (result) => {
        this.branches = result.branches
        this.roles = result.roles
        this.loading = false
      },
      error: (error) => {
        this.snackBar.open("Failed to load form data: " + error.message, "Close", {
          duration: 5000,
        })
        this.loading = false
      },
    })
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key)
        control?.markAsTouched()
      })
      return
    }

    this.loading = true
    const employeeData = this.employeeForm.value

    this.employeeService.createEmployee(employeeData).subscribe({
      next: () => {
        this.loading = false
        this.snackBar.open("Employee created successfully!", "Close", {
          duration: 3000,
        })
        this.goBack()
      },
      error: (error) => {
        this.loading = false
        this.snackBar.open(error.message || "Failed to create employee", "Close", {
          duration: 5000,
        })
      },
    })
  }

  goBack(): void {
    this.router.navigate(["/employees"])
  }

  // Helper methods for form validation
  get nameControl() {
    return this.employeeForm.get("name")
  }

  get phoneControl() {
    return this.employeeForm.get("phone")
  }

  get emailControl() {
    return this.employeeForm.get("email")
  }

  get passwordControl() {
    return this.employeeForm.get("password")
  }

  get addressControl() {
    return this.employeeForm.get("address")
  }

  get branchIdControl() {
    return this.employeeForm.get("branchId")
  }

  get roleIdControl() {
    return this.employeeForm.get("roleId")
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword
  }
}

