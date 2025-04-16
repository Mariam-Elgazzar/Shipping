// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   OnChanges,
//   SimpleChanges,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DeliveryService } from '../../../services/delivery.service';

// @Component({
//   selector: 'app-delivery-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './delivery-details.component.html',
//   styleUrls: ['./delivery-details.component.scss'],
// })
// export class DeliveryDetailsComponent implements OnChanges {
//   @Input() DeliveryId: string | null = null;
//   @Input() isVisible = false;
//   @Output() close = new EventEmitter<void>();

//   DeliveryDetails: any = null;

//   constructor(private DeliveryService: DeliveryService) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['DeliveryId'] && this.DeliveryId) {
//       this.loadDeliveryDetails();
//     }
//   }

//   loadDeliveryDetails(): void {
//     if (!this.DeliveryId) return;

//     this.DeliveryService.getDeliveryDetails(this.DeliveryId).subscribe(
//       (details) => {
//         this.DeliveryDetails = details;
//       },
//       (error) => {
//         console.error('Error loading Delivery details:', error);
//       }
//     );
//   }

//   onOverlayClick(event: MouseEvent): void {
//     if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
//       this.onClose();
//     }
//   }

//   onClose(): void {
//     this.close.emit();
//   }

//   onEdit(): void {
//     console.log('Edit Delivery details:', this.DeliveryId);
//   }
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryResponse } from '../../../models/delivery.model';
import { DeliveryService } from '../../../services/delivery.service';
// import { DeliveryService } from '../../services/delivery.service';
// import { DeliveryResponse } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="delivery-details">
      <h3>Delivery Representative Details</h3>
      <div *ngIf="deliveryRep">
        <p><strong>Name:</strong> {{ deliveryRep.name }}</p>
        <p><strong>Email:</strong> {{ deliveryRep.email }}</p>
        <p><strong>Phone:</strong> {{ deliveryRep.phoneNumber }}</p>
        <p>
          <strong>Hiring Date:</strong>
          {{ deliveryRep.hiringDate | date : 'shortDate' }}
        </p>
        <p>
          <strong>Governorates:</strong>
          {{ deliveryRep.governorates.join(', ') }}
        </p>
        <p><strong>Discount Type:</strong> {{ deliveryRep.discountType }}</p>
        <p>
          <strong>Company Percentage:</strong>
          {{ deliveryRep.companyPercentage }}%
        </p>
      </div>
      <button (click)="close.emit()">Close</button>
    </div>
  `,
  styleUrls: ['./delivery-details.component.scss'],
})
export class DeliveryDetailsComponent {
  @Input() deliveryRepId: string | null = null;
  @Output() close = new EventEmitter<void>();
  deliveryRep: DeliveryResponse | null = null;

  constructor(private deliveryService: DeliveryService) {}

  ngOnChanges(): void {
    if (this.deliveryRepId) {
      this.deliveryService.getDeliveryRepById(this.deliveryRepId).subscribe({
        next: (rep) => (this.deliveryRep = rep),
        error: (err) => console.error('Failed to load delivery rep:', err),
      });
    }
  }
}
