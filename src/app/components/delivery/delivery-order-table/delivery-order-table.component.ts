import { Component, Input,  OnChanges,  OnInit,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DeliveryOrder } from "../../../models/delivert.model"



@Component({
  selector: "app-delivery-order-table",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./delivery-order-table.component.html",
  styleUrls: ["./delivery-order-table.component.scss"],
})
export class DeliveryOrderTableComponent implements OnInit, OnChanges {
  @Input() statusFilter = "deliver"

  orders: DeliveryOrder[] = []
  filteredOrders: DeliveryOrder[] = []
  searchTerm = ""
  selectedOrder: DeliveryOrder | null = null
  showStatusModal = false
  showDetailsModal = false

  statusOptions = ["New", "Waiting for Pickup", "Delivered to Courier", "Delivered", "Cannot Deliver", "Postponed"]

  // Status mapping for filter tabs
  statusMapping = {
    receive: ["New", "Waiting for Pickup"],
    deliver: ["Delivered to Courier"],
    finished: ["Delivered", "Cannot Deliver", "Postponed"],
  }

  constructor() {}

  ngOnInit(): void {
    // Sample data with various statuses
    this.orders = [
      {
        id: "1",
        sequentialNumber: "84318030",
        status: "Delivered to Courier",
        merchant: "Merchant A",
        customer: "John Smith",
        phone: "5555",
        address: "Riyadh - Qasr al Fararah",
        orderCost: 600,
        shippingCost: 52,
      },
      {
        id: "2",
        sequentialNumber: "84318031",
        status: "New",
        merchant: "Merchant B",
        customer: "Sarah Johnson",
        phone: "5556",
        address: "Cairo - Downtown",
        orderCost: 450,
        shippingCost: 35,
      },
      {
        id: "3",
        sequentialNumber: "84318032",
        status: "Delivered",
        merchant: "Merchant C",
        customer: "Michael Brown",
        phone: "5557",
        address: "Alexandria - Corniche",
        orderCost: 780,
        shippingCost: 60,
      },
      {
        id: "4",
        sequentialNumber: "84318033",
        status: "Waiting for Pickup",
        merchant: "Merchant D",
        customer: "Emily Davis",
        phone: "5558",
        address: "Giza - Pyramids Road",
        orderCost: 320,
        shippingCost: 40,
      },
      {
        id: "5",
        sequentialNumber: "84318034",
        status: "Cannot Deliver",
        merchant: "Merchant E",
        customer: "David Wilson",
        phone: "5559",
        address: "Luxor - East Bank",
        orderCost: 550,
        shippingCost: 45,
      },
    ]

    this.applyFilters()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["statusFilter"]) {
      this.applyFilters()
    }
  }

  applyFilters(): void {
    // First apply status fileter based on the active tab
    const statusesToShow = this.statusMapping[this.statusFilter as keyof typeof this.statusMapping] || []

    let filtered = this.orders
    if (statusesToShow.length > 0) {
      filtered = this.orders.filter((order) => statusesToShow.includes(order.status))
    }

    // Then apply search filter if there's a search term
    if (this.searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.sequentialNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          order.merchant.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    this.filteredOrders = filtered
  }

  search(): void {
    this.applyFilters()
  }

  openStatusModal(order: DeliveryOrder): void {
    this.selectedOrder = order
    this.showStatusModal = true
  }

  closeStatusModal(): void {
    this.showStatusModal = false
    this.selectedOrder = null
  }



  closeDetailsModal(): void {
    this.showDetailsModal = false
    this.selectedOrder = null
  }

  saveStatus(status: string): void {
    if (this.selectedOrder) {
      const index = this.orders.findIndex((o) => o.id === this.selectedOrder!.id)
      if (index !== -1) {
        this.orders[index].status = status
        this.applyFilters() // Re-apply filters after status change
      }
    }
    this.closeStatusModal()
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "New":
        return "status-new"
      case "Waiting for Pickup":
        return "status-waiting"
      case "Delivered to Courier":
        return "status-to-courier"
      case "Delivered":
        return "status-delivered"
      case "Cannot Deliver":
        return "status-cannot-deliver"
      case "Postponed":
        return "status-postponed"
      default:
        return ""
    }
  }
}
