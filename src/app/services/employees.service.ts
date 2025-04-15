import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs"
import { delay } from "rxjs/operators"
import { Employee, Branch } from "../models/employee.model"
import { Role } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  // Mock data for employees
  private mockEmployees: Employee[] = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "123 Main St, New York, NY 10001",
      branchId: "1",
      roleId: "2",
      isActive: true,
     
    },
    {
      id: "2",
      name: "Jane Smith",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
      address: "456 Park Ave, Boston, MA 02115",
      branchId: "2",
      roleId: "3",
      isActive: true,
     
    },
    {
      id: "3",
      name: "Michael Johnson",
      phone: "+1 (555) 456-7890",
      email: "michael.johnson@example.com",
      address: "789 Oak St, Chicago, IL 60601",
      branchId: "1",
      roleId: "2",
      isActive: false,
     
    },
  ]

  // Mock data for branches
  private mockBranches: Branch[] = [
    {
      id: "1",
      name: "Main Branch",
      address: "100 Corporate Blvd, New York, NY 10001",
      isActive: true,
    },
    {
      id: "2",
      name: "East Coast Branch",
      address: "200 Harbor Dr, Boston, MA 02115",
      isActive: true,
    },
    {
      id: "3",
      name: "Midwest Branch",
      address: "300 Lake St, Chicago, IL 60601",
      isActive: true,
    },
    {
      id: "4",
      name: "West Coast Branch",
      address: "400 Ocean Ave, Los Angeles, CA 90001",
      isActive: false,
    },
  ]

  // Mock data for roles (using the existing Role model)
  private mockRoles: Role[] = [
    {
      id: "1",
      name: "Administrator",
      description: "Full system access",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Manager",
      description: "Branch management access",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Driver",
      description: "Delivery access",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Customer Service",
      description: "Customer support access",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  constructor() {}

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees).pipe(delay(800))
  }

  // Get employee by ID
  getEmployee(id: string): Observable<Employee> {
    const employee = this.mockEmployees.find((e) => e.id === id)
    if (employee) {
      return of(employee).pipe(delay(500))
    }
    return throwError(() => new Error("Employee not found"))
  }

  // Create new employee
  createEmployee(employee: Omit<Employee, "id" | "createdAt" | "updatedAt">): Observable<Employee> {
    // Check if email already exists
    if (this.mockEmployees.some((e) => e.email === employee.email)) {
      return throwError(() => new Error("Email already exists"))
    }

    const now = new Date()
    const newEmployee: Employee = {
      ...employee,
      id: (this.mockEmployees.length + 1).toString(),
      isActive: true,
    
    }

    this.mockEmployees.push(newEmployee)
    return of(newEmployee).pipe(delay(800))
  }

  // Update employee
  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    const index = this.mockEmployees.findIndex((e) => e.id === id)
    if (index === -1) {
      return throwError(() => new Error("Employee not found"))
    }

    // Check if email already exists (and it's not the current employee's email)
    if (
      employee.email &&
      employee.email !== this.mockEmployees[index].email &&
      this.mockEmployees.some((e) => e.email === employee.email)
    ) {
      return throwError(() => new Error("Email already exists"))
    }

    this.mockEmployees[index] = {
      ...this.mockEmployees[index],
      ...employee,
    
    }

    return of(this.mockEmployees[index]).pipe(delay(800))
  }

  // Delete employee
  deleteEmployee(id: string): Observable<void> {
    const index = this.mockEmployees.findIndex((e) => e.id === id)
    if (index === -1) {
      return throwError(() => new Error("Employee not found"))
    }

    this.mockEmployees.splice(index, 1)
    return of(undefined).pipe(delay(800))
  }

  // Get all branches
  getBranches(): Observable<Branch[]> {
    return of(this.mockBranches.filter((branch) => branch.isActive)).pipe(delay(500))
  }

  // Get all roles
  getRoles(): Observable<Role[]> {
    return of(this.mockRoles).pipe(delay(500))
  }
}

