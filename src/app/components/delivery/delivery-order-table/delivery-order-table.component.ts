import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeliveryOrder } from "../../../models/delivert.model";
import { DeliveryOrderService } from "../../../services/DeliveryOrderService.service";


@Component({
  selector: "app-delivery-order-table",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./delivery-order-table.component.html",
  styleUrls: ["./delivery-order-table.component.scss"],
})
export class DeliveryOrderTableComponent implements OnInit, OnChanges {
  @Input() statusFilter = "deliver";

  orders: DeliveryOrder[] = [];
  filteredOrders: DeliveryOrder[] = [];
  searchTerm = "";
  selectedOrder: DeliveryOrder | null = null;
  showStatusModal = false;
  pageIndex = 1;
  pageSize = 100;
  totalCount = 0;

  statusOptions = [
    "New",
    "Pendding",
    "DeliveredToTheRepresentative",
    "PartiallyDelivered",
    "Delivered",
  ];

  statusMapping = {
    receive: ["New", "Pendding"],
    deliver: ["DeliveredToTheRepresentative"],
    finished: ["PartiallyDelivered", "Delivered"],
  };

  constructor(private deliveryOrderService: DeliveryOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["statusFilter"]) {
      this.applyFilters();
    }
  }

  loadOrders(): void {
    this.deliveryOrderService
      .getAllDeliveryOrders(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log('API Data:', response.data);
          this.orders = response.data;
          this.totalCount = response.totalCount;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
        },
      });
  }

  applyFilters(): void {
    const statusesToShow = this.statusMapping[this.statusFilter as keyof typeof this.statusMapping] || [];

    let filtered = this.orders;
    if (statusesToShow.length > 0) {
      filtered = this.orders.filter((order) => statusesToShow.includes(order.status));
    }

    if (this.searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.sequentialNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.merchant.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredOrders = filtered;
  }

  search(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = "";
    this.applyFilters();
  }

  openStatusModal(order: DeliveryOrder): void {
    this.selectedOrder = order;
    this.showStatusModal = true;
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedOrder = null;
  }

  saveStatus(status: string): void {
    if (this.selectedOrder) {
      this.deliveryOrderService
        .updateOrderStatus(this.selectedOrder.id, status)
        .subscribe({
          next: () => {
            const index = this.orders.findIndex((o) => o.id === this.selectedOrder!.id);
            if (index !== -1) {
              this.orders[index].status = status;
              this.applyFilters();
            }
            this.closeStatusModal();
          },
          error: (error) => {
            console.error("Error updating status:", error);
          },
        });
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'new':
        return 'status-new';
      case 'pendding':
        return 'status-pendding';
      case 'deliveredtotherepresentative':
        return 'status-delivered-to-the-representative';
      case 'partiallydelivered':
        return 'status-partially-delivered';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  }
}
