import { Component, EventEmitter, Input, Output,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface OrderFormData {
  id: string
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
  orderCost: string
}

@Component({
  selector: "app-edit-order-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./edit-order-modal.component.html",
 styleUrls: [
    "./edit-order-modal.component.scss",]
})
export class EditOrderModalComponent implements OnChanges {
  @Input() isVisible = false
  @Input() orderId: string | null = null
  @Input() orderData: any = null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<OrderFormData>()

  formData: OrderFormData = {
    id: "",
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
    orderCost: "",
  }

  // Mock data for dropdowns
  merchants = [
    "Electronics Store",
    "Fashion Outlet",
    "Grocery Market",
    "Home Depot",
    "Auto Parts Store",
    "Chemical Supply Co",
  ]
  governments = ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"]
  citiesByGovernment: { [key: string]: string[] } = {
    Cairo: ["Nasr City", "Maadi", "Heliopolis", "Downtown"],
    Alexandria: ["Miami", "Montazah", "Sidi Gaber", "Agami"],
    Giza: ["Dokki", "Mohandessin", "6th of October", "Sheikh Zayed"],
    Luxor: ["East Bank", "West Bank", "Karnak", "Valley of the Kings"],
    Aswan: ["Aswan City", "Elephantine Island", "Nubia", "High Dam"],
  }
  cities: string[] = []
  branches = [
    "Main Branch",
    "North Branch",
    "South Branch",
    "East Branch",
    "West Branch",
    "Warehouse A",
    "Warehouse B",
    "Warehouse C",
    "Warehouse D",
  ]
  shippingTypes = ["Standard", "Express", "Same Day", "International"]
  paymentMethods = ["Cash on Delivery", "Credit Card", "Debit Card", "Bank Transfer", "Digital Wallet"]

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // When orderData changes, update the form
    if (changes["orderData"] && this.orderData) {
      this.populateForm(this.orderData)
    }
  }

  populateForm(order: any): void {
    this.formData = {
      id: order.id || "",
      orderType: order.category || "",
      merchantName: order.merchant || "",
      customerName: order.customerName || "",
      customerPhone: order.customerPhone || "",
      government: order.government || "",
      city: order.city || "",
      customerEmail: order.customerEmail || "",
      branch: order.lastLocation || "",
      shippingType: order.shippingType || "",
      payWay: order.payWay || "",
      orderCost: order.orderCost || "",
    }

    // Update cities based on selected government
    if (this.formData.government) {
      this.cities = this.citiesByGovernment[this.formData.government] || []
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      this.onClose()
    }
  }

  onClose(): void {
    this.close.emit()
  }

  onGovernmentChange(): void {
    if (this.formData.government) {
      this.cities = this.citiesByGovernment[this.formData.government] || []
      if (!this.cities.includes(this.formData.city)) {
        this.formData.city = "" // Reset city when government changes and current city is not in the new list
      }
    } else {
      this.cities = []
    }
  }

  onSubmit(): void {
    // Validate form
    if (this.validateForm()) {
      this.save.emit({ ...this.formData })
      this.onClose()
    }
  }

  validateForm(): boolean {
    // Add validation logic here
    // For now, just check if required fields are filled
    return (
      !!this.formData.orderType &&
      !!this.formData.merchantName &&
      !!this.formData.customerName &&
      !!this.formData.government &&
      !!this.formData.city
    )
  }
}
