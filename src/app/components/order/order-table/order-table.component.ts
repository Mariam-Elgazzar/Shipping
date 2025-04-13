import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { OrderService } from "../../../services/order.service"
import { OrderDetailsComponent } from "../order-details/order-details.component"

interface Order {
  id: string
  vehicleNumber: string
  vehicleType: string
  driverName: string
  vehicleStatus: string
  lastLocation: string
  deliverySchedule: string
  deliveryStatus: string
}

@Component({
  selector: "app-order-table",
  standalone: true,
  imports: [CommonModule, FormsModule, OrderDetailsComponent],
  template: `
    <div class="order-table-container">
      <div class="table-header">
        <div class="header-left">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Payment history</h3>
        </div>

        <div class="header-actions">
          <button class="add-btn">
            Add New Order
          </button>

          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search something" [(ngModel)]="searchTerm" (input)="filterOrders()">
          </div>

          <button class="filter-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="order-table">
          <thead>
            <tr>
              <th class="checkbox-col">
                <input type="checkbox" (change)="toggleSelectAll($event)">
              </th>
              <th>Vehicle Number</th>
              <th>Vehicle Type</th>
              <th>Driver's Name</th>
              <th>Vehicle Status</th>
              <th>Last Location</th>
              <th>Delivery Schedule</th>
              <th>Delivery Status</th>
              <th class="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of filteredOrders">
              <td class="checkbox-col">
                <input type="checkbox" [checked]="selectedOrders.includes(order.id)" (change)="toggleOrderSelection(order.id)">
              </td>
              <td>{{ order.vehicleNumber }}</td>
              <td>{{ order.vehicleType }}</td>
              <td>{{ order.driverName }}</td>
              <td>
                <span class="status-badge" [ngClass]="order.vehicleStatus.toLowerCase()">
                  {{ order.vehicleStatus }}
                </span>
              </td>
              <td>{{ order.lastLocation }}</td>
              <td>{{ order.deliverySchedule }}</td>
              <td>
                <span class="status-badge" [ngClass]="order.deliveryStatus.toLowerCase()">
                  {{ order.deliveryStatus }}
                </span>
              </td>
              <td class="actions-col">
                <button class="action-btn" (click)="showActionMenu(order.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>

                <div class="action-menu" *ngIf="activeActionMenu === order.id">
                  <button class="menu-item" (click)="viewOrderDetails(order.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View
                  </button>
                  <button class="menu-item" (click)="editOrder(order.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                  <button class="menu-item delete" (click)="deleteOrder(order.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Order Details Modal -->
      <app-order-details
        *ngIf="selectedOrderId"
        [orderId]="selectedOrderId"
        [isVisible]="isOrderDetailsVisible"
        (close)="closeOrderDetails()">
      </app-order-details>
    </div>
  `,
  styles: [
    `
    .order-table-container {
      width: 100%;
      position: relative;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;

      h3 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: #212b36;
      }
    }

    .header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: rgba(0, 167, 111, 0.1);

      svg {
        color: #00a76f;
      }
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .add-btn {
      background-color: #00a76f;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: darken(#00a76f, 5%);
      }
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 8px 12px;
      width: 240px;

      svg {
        color: #637381;
      }

      input {
        border: none;
        background: none;
        outline: none;
        font-size: 14px;
        color: #212b36;
        width: 100%;

        &::placeholder {
          color: #637381;
        }
      }
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: #f5f5f5;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
      color: #212b36;
      cursor: pointer;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .order-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px 16px;
        text-align: left;
        font-size: 14px;
      }

      th {
        color: #637381;
        font-weight: 600;
        background-color: #f9fafb;
      }

      td {
        color: #212b36;
        border-bottom: 1px solid #f0f0f0;
      }

      .checkbox-col {
        width: 40px;
      }

      .actions-col {
        width: 60px;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.active {
        background-color: rgba(0, 167, 111, 0.1);
        color: #00a76f;
      }

      &.inactive, &.defective {
        background-color: rgba(255, 77, 79, 0.1);
        color: #ff4d4f;
      }

      &.delivery {
        background-color: rgba(32, 101, 209, 0.1);
        color: #2065d1;
      }

      &.complete {
        background-color: rgba(0, 167, 111, 0.1);
        color: #00a76f;
      }

      &.pending {
        background-color: rgba(255, 77, 79, 0.1);
        color: #ff4d4f;
      }
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #637381;

      &:hover {
        color: #212b36;
      }
    }

    .action-menu {
      position: absolute;
      right: 40px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 10;
      overflow: hidden;
      width: 120px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      border: none;
      background: none;
      text-align: left;
      font-size: 14px;
      color: #212b36;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }

      &.delete {
        color: #ff4d4f;

        &:hover {
          background-color: rgba(255, 77, 79, 0.1);
        }
      }
    }
  `,
  ],
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = []
  filteredOrders: Order[] = []
  selectedOrders: string[] = []
  activeActionMenu: string | null = null
  searchTerm = ""

  // For order details modal
  selectedOrderId: string | null = null
  isOrderDetailsVisible = false

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders()

    // Close action menu when clicking outside
    document.addEventListener("click", (event) => {
      if (this.activeActionMenu && !(event.target as HTMLElement).closest(".action-btn")) {
        this.activeActionMenu = null
      }
    })
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data
        this.filteredOrders = [...data]
      },
      (error) => {
        console.error("Error loading orders:", error)
      },
    )
  }

  filterOrders(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOrders = [...this.orders]
      return
    }

    const term = this.searchTerm.toLowerCase()
    this.filteredOrders = this.orders.filter(
      (order) =>
        order.vehicleNumber.toLowerCase().includes(term) ||
        order.driverName.toLowerCase().includes(term) ||
        order.lastLocation.toLowerCase().includes(term),
    )
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked

    if (isChecked) {
      this.selectedOrders = this.filteredOrders.map((order) => order.id)
    } else {
      this.selectedOrders = []
    }
  }

  toggleOrderSelection(orderId: string): void {
    const index = this.selectedOrders.indexOf(orderId)

    if (index === -1) {
      this.selectedOrders.push(orderId)
    } else {
      this.selectedOrders.splice(index, 1)
    }
  }

  showActionMenu(orderId: string): void {
    this.activeActionMenu = this.activeActionMenu === orderId ? null : orderId
  }

  viewOrderDetails(orderId: string): void {
    this.selectedOrderId = orderId
    this.isOrderDetailsVisible = true
    this.activeActionMenu = null
  }

  editOrder(orderId: string): void {
    console.log("Edit order:", orderId)
    this.activeActionMenu = null
  }

  deleteOrder(orderId: string): void {
    if (confirm("Are you sure you want to delete this order?")) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.orders = this.orders.filter((order) => order.id !== orderId)
          this.filteredOrders = this.filteredOrders.filter((order) => order.id !== orderId)
        },
        (error) => {
          console.error("Error deleting order:", error)
        },
      )
    }
    this.activeActionMenu = null
  }

  closeOrderDetails(): void {
    this.isOrderDetailsVisible = false
    this.selectedOrderId = null
  }
}
