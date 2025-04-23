import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/Employee.service';
import { Router } from '@angular/router';
import { IEmployeeDetails } from '../../../models/employee.model';
// import { IEmployeeDetails } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() employeeId: string | null = null; // Renamed to camelCase for consistency
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  employeeDetails: IEmployeeDetails | null = null; // Renamed to camelCase
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId'] && this.employeeId) {
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails(): void {
    if (!this.employeeId) {
      this.errorMessage = 'No employee ID provided.';
      return;
    }

    this.errorMessage = null;
    this.employeeService.GetById(this.employeeId).subscribe({
      next: (details: IEmployeeDetails) => {
        this.employeeDetails = details;
      },
      error: (error) => {
        this.errorMessage =
          'Failed to load employee details. Please try again.';
        console.error('Error loading employee details:', error);
      },
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
    this.employeeDetails = null; // Reset details when closing
    this.errorMessage = null; // Reset error message
  }

  onEdit(): void {
    if (this.employeeId) {
      this.router.navigate(['/employees/edit', this.employeeId]);
      this.onClose(); // Close the modal after navigating
    }
  }
}
