import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  OrderReport,
  OrderService,
  PaginatedOrderResponse,
} from '../../services/order.service';
import { OrderResponse } from '../dashboard/dashboard.component';
// import { PaginatedOrderResponse, OrderResponse } from '../../models/order.model';
// import { OrderReport } from '../../models/order-report.model';
export interface OrderFilters {
  search?: string;
  orderState?: string;
  cityId?: number;
  branchId?: number;
  merchantId?: string;
  shippigRepresentativeId?: string;
  fromDate?: string;
  toDate?: string;
  orderType?: string;
  paymentType?: string;
  isDeleted?: boolean;
  sort?: string;
  pageIndex: number;
  pageSize: number;
}
@Component({
  selector: 'app-order-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
})
export class OrderReportComponent implements OnInit {
  orders = signal<OrderReport[]>([]);
  totalCount = signal(0);

  // Filter signals
  searchTerm = signal('');
  selectedStatus = signal<string | null>(null);
  dateRangeStart = signal<Date | null>(null);
  dateRangeEnd = signal<Date | null>(null);

  // Pagination signals
  currentPage = signal(1);
  pageSize = signal(10);
  pageSizeOptions = signal([10, 25, 50, 100]);

  // Status options (aligned with API's orderState values)
  statusOptions = signal([
    { value: 'New', label: 'New' },
    { value: 'Pendding', label: 'Pending' },
    {
      value: 'DeliveredToTheRepresentative',
      label: 'Assigned to Delivery Agent',
    },
    { value: 'Delivered', label: 'Delivered to Customer' },
    { value: 'Unreachable', label: 'Unreachable' },
    { value: 'Postponed', label: 'Postponed' },
    { value: 'PartiallyDelivered', label: 'Partially Delivered' },
    { value: 'CanceledByRecipient', label: 'Canceled by Recipient' },
    { value: 'RejectedWithFullPayment', label: 'Rejected with Full Payment' },
    {
      value: 'RejectedWithPartialPayment',
      label: 'Rejected with Partial Payment',
    },
    { value: 'RejectedWithNoPayment', label: 'Rejected with NO Payment' },
  ]);

  // Loading and error states
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const filters: OrderFilters = {
      search: this.searchTerm() || undefined,
      orderState: this.selectedStatus() || undefined,
      fromDate: this.dateRangeStart()
        ? this.dateRangeStart()!.toISOString()
        : undefined,
      toDate: this.dateRangeEnd()
        ? this.dateRangeEnd()!.toISOString()
        : undefined,
      pageIndex: this.currentPage(),
      pageSize: this.pageSize(),
    };

    this.orderService
      .getAllOrders(
        filters.pageSize,
        filters.pageIndex,
        filters.fromDate,
        filters.toDate
      )
      .subscribe({
        next: (response: PaginatedOrderResponse) => {
          const mappedOrders = response.data.map((order: OrderResponse) => ({
            id: order.id.toString(),
            status: order.orderState,
            merchant: order.merchantName,
            customer: order.customerName,
            phone: order.customerPhone1,
            governorate: order.cityName, // Assuming cityName represents governorate; adjust if there's a separate field
            city: order.cityName,
            orderCost: order.orderPrice,
            receivedAmount: order.amountReceived,
            shippingCost: order.chargePrice,
            paidShippingValue: 0, // Not available in API; set to 0 or derive if needed
            companyValue: order.orderPrice - order.chargePrice, // Example calculation
            date: order.creationDate,
          }));
          this.orders.set(mappedOrders);
          this.totalCount.set(response.totalCount);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to load orders');
          this.isLoading.set(false);
        },
      });
  }

  applyFilters(): void {
    this.currentPage.set(1);
    this.loadOrders();
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set(null);
    this.dateRangeStart.set(null);
    this.dateRangeEnd.set(null);
    this.currentPage.set(1);
    this.loadOrders();
  }

  // Pagination methods
  changePageSize(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadOrders();
  }

  firstPage(): void {
    if (this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.loadOrders();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadOrders();
    }
  }

  lastPage(): void {
    if (this.currentPage() !== this.totalPages()) {
      this.currentPage.set(this.totalPages());
      this.loadOrders();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadOrders();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalCount() / this.pageSize());
  }

  displayRange() {
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(
      this.currentPage() * this.pageSize(),
      this.totalCount()
    );
    return {
      start: this.totalCount() === 0 ? 0 : start,
      end,
      total: this.totalCount(),
    };
  }

  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    const total = this.totalPages();

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, this.currentPage() - half);
    let end = Math.min(total, start + maxPagesToShow - 1);

    if (end - start + 1 < maxPagesToShow) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(-1); // Ellipsis
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push(-1); // Ellipsis
      pages.push(total);
    }

    return pages;
  }
}
