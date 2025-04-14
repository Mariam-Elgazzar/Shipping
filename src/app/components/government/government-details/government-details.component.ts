import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovernmentService } from '../../../services/government.service';
// import { GovernmentService } from '../../../services/Government.service';
// import { GovernmentService } from '../../../services/Government.service';

@Component({
  selector: 'app-Government-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Government-details.component.html',
  styleUrls: ['./Government-details.component.scss'],
})
export class GovernmentDetailsComponent implements OnChanges {
  @Input() GovernmentId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  GovernmentDetails: any = null;

  constructor(private GovernmentService: GovernmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['GovernmentId'] && this.GovernmentId) {
      this.loadGovernmentDetails();
    }
  }

  loadGovernmentDetails(): void {
    if (!this.GovernmentId) return;

    this.GovernmentService.getGovernmentDetails(this.GovernmentId).subscribe(
      (details) => {
        this.GovernmentDetails = details;
      },
      (error) => {
        console.error('Error loading Government details:', error);
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
    console.log('Edit Government details:', this.GovernmentId);
  }
}
