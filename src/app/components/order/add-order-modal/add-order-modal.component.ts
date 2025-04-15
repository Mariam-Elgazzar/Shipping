import { Component, EventEmitter, Input, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule,  FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms"

interface Product {
  name: string
  quantity: number
  weight: number
}

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
  products: Product[]
  totalWeight: number
  packageCost: number
  notes: string
}

@Component({
  selector: "app-add-order-modal",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./add-order-modal.component.html",
  styleUrls: ["./add-order-modal.component.scss"],
})
export class AddOrderModalComponent {
  @Input() isVisible = false
  @Output() close = new EventEmitter<void>()
  @Output() create = new EventEmitter<OrderFormData>()

  orderForm!: FormGroup

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

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  get productsArray() {
    return this.orderForm.get("products") as FormArray
  }

  createForm() {
    this.orderForm = this.fb.group({
      orderType: ["", Validators.required],
      merchantName: ["", Validators.required],
      customerName: ["", Validators.required],
      customerPhone: ["", [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      government: ["", Validators.required],
      city: ["", Validators.required],
      customerEmail: ["", Validators.email],
      branch: ["", Validators.required],
      shippingType: ["", Validators.required],
      payWay: ["", Validators.required],
      products: this.fb.array([this.createProductFormGroup()]),
      packageCost: [0, [Validators.required, Validators.min(0.01)]],
      totalWeight: [0],
      notes: [""],
    })
  }

  createProductFormGroup() {
    return this.fb.group({
      name: ["", Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      weight: [0.1, [Validators.required, Validators.min(0.1)]],
    })
  }

  addProduct() {
    this.productsArray.push(this.createProductFormGroup())
  }

  removeProduct(index: number) {
    if (this.productsArray.length > 1) {
      this.productsArray.removeAt(index)
      this.updateTotalWeight()
    }
  }

  calculateTotalWeight(): number {
    let total = 0
    const products = this.productsArray.value

    for (const product of products) {
      total += product.quantity * product.weight
    }

    this.orderForm.get("totalWeight")?.setValue(total.toFixed(2))
    return total
  }

  updateTotalWeight() {
    this.calculateTotalWeight()
  }

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
    const governmentValue = this.orderForm.get("government")?.value

    if (governmentValue) {
      this.cities = this.citiesByGovernment[governmentValue] || []
      this.orderForm.get("city")?.setValue("")
    } else {
      this.cities = []
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value as OrderFormData
      this.create.emit(formData)
      this.resetForm()
      this.close.emit()
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.orderForm)
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched()

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          this.markFormGroupTouched(control.at(i) as FormGroup)
        }
      }
    })
  }

  resetForm(): void {
    this.orderForm.reset()

    // Clear the products array except for one empty product
    while (this.productsArray.length > 0) {
      this.productsArray.removeAt(0)
    }

    this.productsArray.push(this.createProductFormGroup())
    this.cities = []
  }
}

