import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Government } from '../../../models/government.interface';
import { GovernmentService } from '../../../services/government.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-Government-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './government-details.component.html',
  styleUrls: ['./government-details.component.scss'],
})
export class GovernmentDetailsComponent implements OnChanges {
  @Input() GovernmentId: number | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  GovernmentDetails: Government | null = null;

  constructor(
    private GovernmentService: GovernmentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['GovernmentId'] && this.GovernmentId) {
      this.loadGovernmentDetails();
    }
  }

  loadGovernmentDetails(): void {
    if (!this.GovernmentId) return;

    this.GovernmentService.getGovernmentDetails(this.GovernmentId).subscribe({
      next: (details) => {
        this.GovernmentDetails = details;
      },
      error: (error) => {
        console.error('Error loading Government details:', error);
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
  }

  onEdit(): void {
    if (this.GovernmentId && this.GovernmentDetails) {
      console.log("ajfhkfjl");

      this.router.navigate([`/government/${this.GovernmentId}/update`]);
    }


 
    this.onClose();
  }
}
