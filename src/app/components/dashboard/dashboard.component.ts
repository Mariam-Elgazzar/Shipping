import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { MatIconModule } from '@angular/material/icon';
export interface ProductResponse {
  id: number;
  name: string;
  weight: number;
  quantity: number;
  orderId: number;
}

export interface OrderResponse {
  id: number;
  creationDate: string;
  customerName: string;
  customerPhone1: string;
  customerPhone2: string;
  villageAndStreet: string;
  notes: string | null;
  orderState: string;
  orderType: string;
  paymentType: string;
  chargePrice: number;
  orderPrice: number;
  amountReceived: number;
  totalWeight: number;
  isDeleted: boolean;
  isShippingToVillage?: boolean;
  cityName: string;
  chargeTypeName: string;
  branchName: string;
  merchantName: string;
  shippigRepresentativeName: string | null;
  products: ProductResponse[];
}

export interface PaginatedOrderResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: OrderResponse[];
}

interface StatusCount {
  label: string;
  count: number;
  icon: string;
}

interface StatusCount {
  label: string;
  count: number;
  icon: string; // Now represents mat-icon name (e.g., 'add', 'hourglass_empty')
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  orders = signal<PaginatedOrderResponse | null>(null);
  statusCounts = signal<StatusCount[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.orderService.getAllOrders(1, 100).subscribe({
      next: (response) => {
        this.orders.set(response);
        this.calculateStatusCounts();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load orders');
        this.isLoading.set(false);
      },
    });
  }

  calculateStatusCounts(): void {
    if (!this.orders()) {
      this.statusCounts.set([]);
      return;
    }

    const orderData = this.orders()!.data;

    // Map API orderState to dashboard labels
    const statusMap: { [key: string]: string } = {
      New: 'New',
      Pendding: 'Pending',
      DeliveredToTheRepresentative: 'Assigned to Delivery Agent',
      Delivered: 'Delivered to Customer',
      Unreachable: 'Unreachable',
      Postponed: 'Postponed',
      PartiallyDelivered: 'Partially Delivered',
      CanceledByRecipient: 'Canceled by Recipient',
      RejectedWithFullPayment: 'Rejected with Full Payment',
      RejectedWithPartialPayment: 'Rejected with Partial Payment',
      RejectedWithNoPayment: 'Rejected with NO Payment',
    };

    // Initialize counts for each status
    const counts: { [key: string]: number } = {
      New: 0,
      Pending: 0,
      'Assigned to Delivery Agent': 0,
      'Delivered to Customer': 0,
      Unreachable: 0,
      Postponed: 0,
      'Partially Delivered': 0,
      'Canceled by Recipient': 0,
      'Rejected with Full Payment': 0,
      'Rejected with Partial Payment': 0,
      'Rejected with NO Payment': 0,
    };

    // Count orders for each status
    orderData.forEach((order: OrderResponse) => {
      const dashboardLabel = statusMap[order.orderState];
      if (dashboardLabel && counts.hasOwnProperty(dashboardLabel)) {
        counts[dashboardLabel]++;
      }
    });

    // Define mat-icon names for each status
    const statusCounts: StatusCount[] = [
      {
        label: 'New',
        count: counts['New'],
        icon: 'add', // Material icon for "New"
      },
      {
        label: 'Pending',
        count: counts['Pending'],
        icon: 'hourglass_empty', // Material icon for "Pending"
      },
      {
        label: 'Assigned to Delivery Agent',
        count: counts['Assigned to Delivery Agent'],
        icon: 'local_shipping', // Material icon for "Assigned to Delivery Agent"
      },
      {
        label: 'Delivered to Customer',
        count: counts['Delivered to Customer'],
        icon: 'check_circle', // Material icon for "Delivered to Customer"
      },
      {
        label: 'Unreachable',
        count: counts['Unreachable'],
        icon: 'phone_missed', // Material icon for "Unreachable"
      },
      {
        label: 'Postponed',
        count: counts['Postponed'],
        icon: 'schedule', // Material icon for "Postponed"
      },
      {
        label: 'Partially Delivered',
        count: counts['Partially Delivered'],
        icon: 'done_all', // Material icon for "Partially Delivered"
      },
      {
        label: 'Canceled by Recipient',
        count: counts['Canceled by Recipient'],
        icon: 'cancel', // Material icon for "Canceled by Recipient"
      },
      {
        label: 'Rejected with Full Payment',
        count: counts['Rejected with Full Payment'],
        icon: 'money_off', // Material icon for "Rejected with Full Payment"
      },
      {
        label: 'Rejected with Partial Payment',
        count: counts['Rejected with Partial Payment'],
        icon: 'money_off', // Material icon for "Rejected with Partial Payment"
      },
      {
        label: 'Rejected with NO Payment',
        count: counts['Rejected with NO Payment'],
        icon: 'money_off', // Material icon for "Rejected with NO Payment"
      },
    ];

    this.statusCounts.set(statusCounts);
  }
}
