import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../../services/order.service';

interface OrderProduct {
  id: number;
  name: string;
  quantity: number;
  weight: number;
  orderId: number;
}

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnChanges {
  @Input() orderId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  orderDetails: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderId'] && this.orderId) {
      this.loadOrderDetails();
    }
  }

  loadOrderDetails(): void {
    if (!this.orderId) return;

    this.orderService.getOrderById(Number(this.orderId)).subscribe({
      next: (details) => {
        this.orderDetails = details;
      },
      error: (error) => {
        console.error('Error loading order details:', error);
        alert(error.message); // Display error to user
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

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      Pendding: 'pending',
      Delivered: 'delivered',
      'Partially Delivered': 'partially-delivered',
      Cancelled: 'cancelled',
      Postponed: 'postponed',
      Rejected: 'rejected',
    };
    return statusMap[status] || 'pending';
  }
}
