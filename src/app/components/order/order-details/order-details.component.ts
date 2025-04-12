// import { Component, Input, Output, EventEmitter,  OnChanges,  SimpleChanges } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import  { OrderService } from "../../../services/order.service"

// @Component({
//   selector: "app-order-details",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: "./order-details.components.html",
//   styleUrls: ["./order-details.components.scss"],
// })

// export class OrderDetailsComponent implements OnChanges {
//   @Input() orderId: string | null = null
//   @Input() isVisible = false
//   @Output() close = new EventEmitter<void>()

//   orderDetails: any = null

//   constructor(private orderService: OrderService) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes["orderId"] && this.orderId) {
//       this.loadOrderDetails()
//     }
//   }

//   loadOrderDetails(): void {
//     if (!this.orderId) return

//     this.orderService.getOrderDetails(this.orderId).subscribe(
//       (details) => {
//         this.orderDetails = details
//       },
//       (error) => {
//         console.error("Error loading order details:", error)
//       },
//     )
//   }

//   onOverlayClick(event: MouseEvent): void {
//     if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
//       this.onClose()
//     }
//   }

//   onClose(): void {
//     this.close.emit()
//   }

//   onEdit(): void {
//     console.log("Edit order details:", this.orderId)
//   }
// }
import { Component, Input, Output, EventEmitter,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { OrderService } from "../../../services/order.service"

@Component({
  selector: "app-order-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isVisible" (click)="onOverlayClick($event)">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Order Details</h2>
          <button class="close-btn" (click)="onClose()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-content" *ngIf="orderDetails">
          <div class="order-section">
            <h3>Order Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Order ID</div>
                <div class="info-value">{{ orderDetails.id }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Category</div>
                <div class="info-value">{{ orderDetails.category }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Weight</div>
                <div class="info-value">{{ orderDetails.weight }}</div>
              </div>
            </div>
          </div>

          <div class="order-section">
            <h3>Location Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Origin</div>
                <div class="info-value">{{ orderDetails.origin }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Destination</div>
                <div class="info-value">{{ orderDetails.destination }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Last Location</div>
                <div class="info-value">{{ orderDetails.lastLocation }}</div>
              </div>
            </div>
          </div>

          <div class="order-section">
            <h3>Delivery Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Arrival Date</div>
                <div class="info-value">{{ orderDetails.arrivalDate }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge">In Transit</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-section" *ngIf="orderDetails.trackingHistory?.length">
            <h3>Tracking History</h3>
            <div class="history-timeline">
              <div class="timeline-item" *ngFor="let history of orderDetails.trackingHistory">
                <div class="timeline-dot" [ngClass]="history.status.toLowerCase()"></div>
                <div class="timeline-content">
                  <div class="timeline-date">{{ history.date }}</div>
                  <div class="timeline-title">{{ history.title }}</div>
                  <div class="timeline-description">{{ history.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="secondary-btn" (click)="onClose()">Close</button>
          <button class="primary-btn" (click)="onEdit()">Edit Details</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
      }
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;

      &:hover {
        color: #1e293b;
      }
    }

    .modal-content {
      padding: 24px;
    }

    .order-section {
      margin-bottom: 24px;

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 16px 0;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    .info-item {
      .info-label {
        font-size: 12px;
        color: #64748b;
        margin-bottom: 4px;
      }

      .info-value {
        font-size: 14px;
        color: #1e293b;
        font-weight: 500;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      background-color: rgba(32, 101, 209, 0.1);
      color: #2065d1;
    }

    .history-timeline {
      position: relative;
      padding-left: 20px;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 8px;
        width: 2px;
        background-color: #f0f0f0;
      }
    }

    .timeline-item {
      position: relative;
      padding-bottom: 20px;

      &:last-child {
        padding-bottom: 0;
      }
    }

    .timeline-dot {
      position: absolute;
      left: -20px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #2065d1;

      &.pending {
        background-color: #f59e0b;
      }

      &.delivered {
        background-color: #10b981;
      }

      &.failed {
        background-color: #ef4444;
      }
    }

    .timeline-content {
      padding-left: 12px;
    }

    .timeline-date {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 4px;
    }

    .timeline-title {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .timeline-description {
      font-size: 14px;
      color: #64748b;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px;
      border-top: 1px solid #f0f0f0;
    }

    .secondary-btn {
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 14px;
      color: #1e293b;
      cursor: pointer;

      &:hover {
        background-color: #f8fafc;
      }
    }

    .primary-btn {
      background-color: #064e3b;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 14px;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #065f46;
      }
    }
  `,
  ],
})
export class OrderDetailsComponent implements OnChanges {
  @Input() orderId: string | null = null
  @Input() isVisible = false
  @Output() close = new EventEmitter<void>()

  orderDetails: any = null

  constructor(private orderService: OrderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["orderId"] && this.orderId) {
      this.loadOrderDetails()
    }
  }

  loadOrderDetails(): void {
    if (!this.orderId) return

    this.orderService.getOrderDetails(this.orderId).subscribe(
      (details) => {
        this.orderDetails = details
      },
      (error) => {
        console.error("Error loading order details:", error)
      },
    )
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      this.onClose()
    }
  }

  onClose(): void {
    this.close.emit()
  }

  onEdit(): void {
    console.log("Edit order details:", this.orderId)
  }
}

