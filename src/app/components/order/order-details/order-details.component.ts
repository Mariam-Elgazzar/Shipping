import { Component, Input, Output, EventEmitter,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { OrderService } from "../../../services/order.service"

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
