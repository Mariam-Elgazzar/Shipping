import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../../../services/employee.service';
import {
  IGetAllEmployee,
  IBranchParams,
  IGetAllEmployeeResponse,
} from '../../../models/employee.model';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/Employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    // EmployeeRoutingModule,
    EmployeeDetailsComponent,
  ],
})
export class EmployeeComponent implements OnInit {
  employees: IGetAllEmployee[] = [];
  filteredEmployees: IGetAllEmployee[] = [];
  selectedEmployees: string[] = [];
  searchTerm: string = '';
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading: boolean = false;
  errorMessage: string = '';
  activeActionMenu: string | null = null;
  selectedEmployeeId: string | null = null;
  isEmployeeDetailsVisible: boolean = false;

  // Pagination
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  displayRange: { start: number; end: number; total: number } = {
    start: 0,
    end: 0,
    total: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    const params: IBranchParams = {
      pageSize: this.pageSize,
      pageIndex: this.currentPage,
      SearchByName: this.searchTerm,
    };

    this.employeeService.GetAll(params).subscribe({
      next: (response: IGetAllEmployeeResponse) => {
        this.employees = Array.isArray(response.data) ? response.data : [];
        this.totalItems = response.total || this.employees.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.filterEmployees();
        this.updateDisplayRange();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employees. Please try again.';
        this.isLoading = false;
        console.error('API Error:', error);
      },
    });
  }

  filterEmployees(): void {
    if (!Array.isArray(this.employees)) {
      this.filteredEmployees = [];
      this.updateDisplayRange();
      return;
    }

    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortEmployees();
    this.updateDisplayRange();
  }

  sortEmployees(): void {
    this.filteredEmployees.sort((a, b) => {
      const aValue = this.getSortValue(a, this.sortColumn);
      const bValue = this.getSortValue(b, this.sortColumn);
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortValue(employee: IGetAllEmployee, column: string): any {
    switch (column) {
      case 'name':
        return employee.name.toLowerCase();
      case 'email':
        return employee.email.toLowerCase();
      case 'phoneNumber':
        return employee.phoneNumber;
      case 'branches':
        return employee.branches
          .map((b) => b.name)
          .join(', ')
          .toLowerCase();
      case 'permission':
        return employee.permission.toLowerCase();
      default:
        return '';
    }
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortEmployees();
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedEmployees = checked
      ? this.filteredEmployees.map((employee) => employee.id)
      : [];
  }

  toggleEmployeeSelection(id: string): void {
    if (this.selectedEmployees.includes(id)) {
      this.selectedEmployees = this.selectedEmployees.filter(
        (employeeId) => employeeId !== id
      );
    } else {
      this.selectedEmployees.push(id);
    }
  }

  showActionMenu(id: string): void {
    this.activeActionMenu = this.activeActionMenu === id ? null : id;
  }

  viewEmployeeDetails(id: string): void {
    this.selectedEmployeeId = id;
    this.isEmployeeDetailsVisible = true;
    this.activeActionMenu = null;
  }

  closeEmployeeDetails(): void {
    this.isEmployeeDetailsVisible = false;
    this.selectedEmployeeId = null;
  }

  editEmployee(employee: IGetAllEmployee): void {
    this.router.navigate(['/employees/edit', employee.id]);
    this.activeActionMenu = null;
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.DeleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(
            (employee) => employee.id !== id
          );
          this.filterEmployees();
          this.activeActionMenu = null;
        },
        error: () => {
          this.errorMessage = 'Failed to delete employee. Please try again.';
        },
      });
    }
  }

  changePageSize(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1;
    this.loadEmployees();
  }

  firstPage(): void {
    this.currentPage = 1;
    this.loadEmployees();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
    this.loadEmployees();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadEmployees();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(-1); // Ellipsis
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) pages.push(-1); // Ellipsis
      pages.push(this.totalPages);
    }

    return pages;
  }

  updateDisplayRange(): void {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    this.displayRange = { start, end, total: this.totalItems };
  }
}
