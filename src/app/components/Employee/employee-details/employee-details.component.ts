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

@Component({
  selector: 'app-Employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Employee-details.component.html',

  styleUrls: ['./Employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() EmployeeId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  EmployeeDetails: any = null;

  constructor(private EmployeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['EmployeeId'] && this.EmployeeId) {
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails(): void {
    if (!this.EmployeeId) return;

    this.EmployeeService.getEmployeeDetails(this.EmployeeId).subscribe(
      (details) => {
        this.EmployeeDetails = details;
      },
      (error) => {
        console.error('Error loading Employee details:', error);
      }
    );
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onEdit(): void {
    console.log('Edit Employee details:', this.EmployeeId);
  }
}
