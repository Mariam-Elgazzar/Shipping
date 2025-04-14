
import { Component, Input, Output, EventEmitter,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { OrderService } from "../../../services/order.service"

interface OrderProduct {
  name: string
  quantity: number
  weight: string
}

@Component({
  selector: "app-order-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl:"./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
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
        // If products don't exist, add sample products for demonstration
        if (!details.products) {
          details.products = [
            { name: "Laptop", quantity: 1, weight: "2.5 kg" },
            { name: "Smartphone", quantity: 2, weight: "0.4 kg" },
            { name: "Headphones", quantity: 3, weight: "0.3 kg" },
          ]
        }
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

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      New: "new",
      Delivered: "delivered",
      "Partially Delivered": "partially-delivered",
      Cancelled: "cancelled",
      "Cancelled by Recipient": "cancelled",
      Postponed: "postponed",
      Rejected: "rejected",
      "Rejected with Payment": "rejected",
      "Rejected without Payment": "rejected",
    }

    return statusMap[status] || "new"
  }
}
