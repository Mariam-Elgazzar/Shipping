import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {  EmployeeService } from '../../../services/Employee.service';
// import { EmployeeDetailsComponent } from '../Employee-details/Employee-details.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { EmployeeDetailsComponent } from '../Employee-details/Employee-details.component';
import { EmployeeService } from '../../../services/Employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchLocation: string;
  branchName: string;
  status: string;
}
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    EmployeeDetailsComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  Employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployees: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';

  // For  Employee details modal
  selectedEmployeeId: string | null = null;
  isEmployeeDetailsVisible = false;

  constructor(private EmployeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();

    // Close action menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    });
  }

  loadEmployees(): void {
    this.EmployeeService.getEmployees().subscribe(
      (data) => {
        this.Employees = data;
        this.filteredEmployees = [...data];
      },
      (error) => {
        console.error('Error loading  Employees:', error);
      }
    );
  }

  filterEmployees(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = [...this.Employees];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.Employees.filter(
      (Employee) =>
        Employee.phone.toLowerCase().includes(term) ||
        Employee.name.toLowerCase().includes(term) ||
        Employee.branchLocation.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedEmployees = this.filteredEmployees.map(
        (Employee) => Employee.id
      );
    } else {
      this.selectedEmployees = [];
    }
  }

  toggleEmployeeSelection(EmployeeId: string): void {
    const index = this.selectedEmployees.indexOf(EmployeeId);

    if (index === -1) {
      this.selectedEmployees.push(EmployeeId);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
  }

  showActionMenu(EmployeeId: string): void {
    this.activeActionMenu =
      this.activeActionMenu === EmployeeId ? null : EmployeeId;
  }

  viewEmployeeDetails(EmployeeId: string): void {
    this.selectedEmployeeId = EmployeeId;
    this.isEmployeeDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editEmployee(EmployeeId: string): void {
    console.log('Edit  Employee:', EmployeeId);
    this.activeActionMenu = null;
  }

  deleteEmployee(EmployeeId: string): void {
    if (confirm('Are you sure you want to delete this  Employee?')) {
      this.EmployeeService.deleteEmployee(EmployeeId).subscribe(
        () => {
          this.Employees = this.Employees.filter(
            (Employee) => Employee.id !== EmployeeId
          );
          this.filteredEmployees = this.filteredEmployees.filter(
            (Employee) => Employee.id !== EmployeeId
          );
        },
        (error) => {
          console.error('Error deleting  Employee:', error);
        }
      );
    }
    this.activeActionMenu = null;
  }

  closeEmployeeDetails(): void {
    this.isEmployeeDetailsVisible = false;
    this.selectedEmployeeId = null;
  }
}
