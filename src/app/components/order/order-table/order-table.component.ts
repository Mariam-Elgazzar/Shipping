import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { OrderService } from "../../../services/order.service"
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
  templateUrl:"./order-table.component.html",
    styleUrls:["./order-table.component.scss"]})
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
