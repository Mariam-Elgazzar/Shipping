import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryService } from '../../../services/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss'],
})
export class DeliveryDetailsComponent implements OnChanges {
  @Input() DeliveryId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  DeliveryDetails: any = null;
  constructor(private DeliveryService: DeliveryService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['DeliveryId'] && this.DeliveryId) {
      this.loadDeliveryDetails();
    }
  }

  loadDeliveryDetails(): void {
    if (!this.DeliveryId) return;

    this.DeliveryService.getDeliveryDetails(this.DeliveryId).subscribe(
      (details) => {
        this.DeliveryDetails = details;
      },
      (error) => {
        console.error('Error loading Delivery details:', error);
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
this.route.navigate([`delivery/update/:${this.DeliveryId}`]); // Navigate to the update page with the selected Delivery ID}
}
}
