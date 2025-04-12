// import { Component, Input, Output, EventEmitter, OnChanges,  SimpleChanges } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { CourierService } from "../../../services/courier.service"

// @Component({
//   selector: "app-courier-order-details",
//   standalone: true,
//   imports: [CommonModule],
// templateUrl:"./add-order-modal.component.html",
// styleUrls: ["./add-order-modal.component.scss"],
// })
// export class AddOrderModalComponent implements OnChanges {
//   @Input() orderId: string | null = null
//   @Input() isVisible = false
//   @Output() close = new EventEmitter<void>()

//   orderDetails: any = null

//   constructor(private courierService: CourierService) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes["orderId"] && this.orderId) {
//       this.loadOrderDetails()
//     }
//   }

//   loadOrderDetails(): void {
//     if (!this.orderId) return

//     this.courierService.getOrderDetails(this.orderId).subscribe((details) => {
//       this.orderDetails = details
//     })
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
//     // Implement edit functionality
//     console.log("Edit order details:", this.orderId)
//   }
// }
import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface OrderFormData {
  orderType: string
  merchantName: string
  customerName: string
  customerPhone: string
  government: string
  city: string
  customerEmail: string
  branch: string
  shippingType: string
  payWay: string
}

@Component({
  selector: "app-add-order-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isVisible" (click)="onOverlayClick($event)">
      <div class="modal-container">
        <div class="modal-header">
          <div class="header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h2>New Order</h2>
          <button class="close-btn" (click)="onClose()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-description">
          Office ipsum you must be muted. Eod items own pants files charts line deliverables that's users.
        </div>

        <div class="modal-content">
          <div class="form-group">
            <label for="orderType">Order Type</label>
            <input type="text" id="orderType" placeholder="Enter order type" [(ngModel)]="formData.orderType">
          </div>

          <div class="form-group">
            <label for="merchantName">Merchant Name</label>
            <div class="select-wrapper">
              <select id="merchantName" [(ngModel)]="formData.merchantName">
                <option value="" disabled selected>Select merchant</option>
                <option *ngFor="let merchant of merchants" [value]="merchant">{{ merchant }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="customerName">Customer Name</label>
            <input type="text" id="customerName" placeholder="Enter customer name" [(ngModel)]="formData.customerName">
          </div>

          <div class="form-group">
            <label for="customerPhone">Customer Phone</label>
            <input type="text" id="customerPhone" placeholder="Enter customer phone" [(ngModel)]="formData.customerPhone">
          </div>

          <div class="form-group">
            <label for="government">Government</label>
            <div class="select-wrapper">
              <select id="government" [(ngModel)]="formData.government" (change)="onGovernmentChange()">
                <option value="" disabled selected>Select government</option>
                <option *ngFor="let gov of governments" [value]="gov">{{ gov }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="city">City</label>
            <div class="select-wrapper">
              <select id="city" [(ngModel)]="formData.city">
                <option value="" disabled selected>Select city</option>
                <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="customerEmail">Customer Email</label>
            <input type="email" id="customerEmail" placeholder="Enter customer email" [(ngModel)]="formData.customerEmail">
          </div>

          <div class="form-group">
            <label for="branch">Branch</label>
            <div class="select-wrapper">
              <select id="branch" [(ngModel)]="formData.branch">
                <option value="" disabled selected>Select branch</option>
                <option *ngFor="let branch of branches" [value]="branch">{{ branch }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="shippingType">Shipping Type</label>
            <div class="select-wrapper">
              <select id="shippingType" [(ngModel)]="formData.shippingType">
                <option value="" disabled selected>Select shipping type</option>
                <option *ngFor="let type of shippingTypes" [value]="type">{{ type }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="payWay">Payment Method</label>
            <div class="select-wrapper">
              <select id="payWay" [(ngModel)]="formData.payWay">
                <option value="" disabled selected>Select payment method</option>
                <option *ngFor="let method of paymentMethods" [value]="method">{{ method }}</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-btn" (click)="onClose()">Cancel</button>
          <button class="create-btn" (click)="onSubmit()">Create</button>
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
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .modal-header {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 0 12px;
      }
    }

    .header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #f1f5f9;

      svg {
        color: #1e293b;
      }
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
      margin-left: auto;

      &:hover {
        color: #1e293b;
      }
    }

    .modal-description {
      padding: 0 24px 16px;
      color: #64748b;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
    }

    .modal-content {
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    .form-group {
      margin-bottom: 8px;

      label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
        margin-bottom: 6px;
      }

      input, select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 14px;
        color: #1e293b;

        &:focus {
          outline: none;
          border-color: #064e3b;
        }

        &::placeholder {
          color: #94a3b8;
        }
      }
    }

    .select-wrapper {
      position: relative;

      svg {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #64748b;
      }

      select {
        appearance: none;
        padding-right: 30px;
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px;
      border-top: 1px solid #f0f0f0;
    }

    .cancel-btn {
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

    .create-btn {
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
export class AddOrderModalComponent {
  @Input() isVisible = false
  @Output() close = new EventEmitter<void>()
  @Output() create = new EventEmitter<OrderFormData>()

  formData: OrderFormData = {
    orderType: "",
    merchantName: "",
    customerName: "",
    customerPhone: "",
    government: "",
    city: "",
    customerEmail: "",
    branch: "",
    shippingType: "",
    payWay: "",
  }

  // Mock data for dropdowns
  merchants = ["Merchant 1", "Merchant 2", "Merchant 3", "Merchant 4"]
  governments = ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"]
  citiesByGovernment: { [key: string]: string[] } = {
    Cairo: ["Nasr City", "Maadi", "Heliopolis", "Downtown"],
    Alexandria: ["Miami", "Montazah", "Sidi Gaber", "Agami"],
    Giza: ["Dokki", "Mohandessin", "6th of October", "Sheikh Zayed"],
    Luxor: ["East Bank", "West Bank", "Karnak", "Valley of the Kings"],
    Aswan: ["Aswan City", "Elephantine Island", "Nubia", "High Dam"],
  }
  cities: string[] = []
  branches = ["Main Branch", "North Branch", "South Branch", "East Branch", "West Branch"]
  shippingTypes = ["Standard", "Express", "Same Day", "International"]
  paymentMethods = ["Cash on Delivery", "Credit Card", "Debit Card", "Bank Transfer", "Digital Wallet"]

  constructor() {}

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      this.onClose()
    }
  }

  onClose(): void {
    this.resetForm()
    this.close.emit()
  }

  onGovernmentChange(): void {
    if (this.formData.government) {
      this.cities = this.citiesByGovernment[this.formData.government] || []
      this.formData.city = "" // Reset city when government changes
    } else {
      this.cities = []
    }
  }

  onSubmit(): void {
    // Validate form
    if (this.validateForm()) {
      this.create.emit({ ...this.formData })
      this.resetForm()
      this.close.emit()
    }
  }

  validateForm(): boolean {
    // Add validation logic here
    // For now, just check if required fields are filled
    return (
      !!this.formData.orderType &&
      !!this.formData.merchantName &&
      !!this.formData.customerName &&
      !!this.formData.customerPhone
    )
  }

  resetForm(): void {
    this.formData = {
      orderType: "",
      merchantName: "",
      customerName: "",
      customerPhone: "",
      government: "",
      city: "",
      customerEmail: "",
      branch: "",
      shippingType: "",
      payWay: "",
    }
    this.cities = []
  }
}
