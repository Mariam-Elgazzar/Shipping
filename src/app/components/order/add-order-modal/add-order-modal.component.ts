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
  templateUrl:"./add-order-modal.component.html",
  styleUrls: [
    "./add-order-modal.component.scss",]
  
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
