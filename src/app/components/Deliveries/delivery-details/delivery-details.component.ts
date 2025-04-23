import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryResponse } from '../../../models/delivery.model';
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
  @Input() deliveryRepId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  deliveryRep: DeliveryResponse | null = null;

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deliveryRepId'] && this.deliveryRepId) {
      this.loadDeliveryDetails();
    }
  }

  loadDeliveryDetails(): void {
    if (!this.deliveryRepId) return;

    this.deliveryService.getDeliveryRepById(this.deliveryRepId).subscribe({
      next: (rep) => {
        this.deliveryRep = rep;
      },
      error: (err) => {
        console.error('Failed to load delivery rep:', err);
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
    this.deliveryRep = null;
  }

  onEdit(): void {
    if (this.deliveryRepId) {
      this.router.navigate([`/delivery-reps/edit/${this.deliveryRepId}`]);
      this.onClose();
    }
  }
}
