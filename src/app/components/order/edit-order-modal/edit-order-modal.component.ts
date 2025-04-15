// This file contains the EditOrderModalComponent which is responsible for displaying and editing order details in a modal dialog.
import { Component, EventEmitter, Input, Output,  OnChanges,  SimpleChanges } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormArray,  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"

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
  products: Array<{
    name: string
    quantity: number
    weight: string
  }>
  notes?: string
}

@Component({
  selector: "app-edit-order-modal",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./edit-order-modal.component.html",
  styleUrls: ["./edit-order-modal.component.scss"],
})

export class EditOrderModalComponent implements OnChanges {
  @Input() isVisible = false
  @Input() orderId: string | null = null
  @Input() orderData: any = null
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<OrderFormData>()

  orderForm: FormGroup

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

  constructor(private fb: FormBuilder) {
    this.orderForm = this.createOrderForm()
  }

  get productsArray(): FormArray {
    return this.orderForm.get("products") as FormArray
  }

  createOrderForm(): FormGroup {
    return this.fb.group({
      id: [""],
      orderType: ["", Validators.required],
      merchantName: ["", Validators.required],
      customerName: ["", Validators.required],
      customerPhone: [
        "",
        [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)],
      ],
      government: ["", Validators.required],
      city: ["", Validators.required],
      customerEmail: ["", Validators.email],
      branch: ["", Validators.required],
      shippingType: ["", Validators.required],
      payWay: ["", Validators.required],
      orderCost: ["", [Validators.required, Validators.pattern(/^\$?\d+(\.\d{1,2})?$/)]],
      products: this.fb.array([this.createProductFormGroup()]),
      notes: [""],
    })
  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      weight: ["", Validators.required],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // When orderData changes, update the form
    if (changes["orderData"] && this.orderData) {
      this.populateForm(this.orderData)
    }
  }

  populateForm(order: any): void {
    // Reset the form and create a new one
    this.orderForm = this.createOrderForm()

    // Update cities based on selected government
    if (order.government) {
      this.cities = this.citiesByGovernment[order.government] || []
    }

    // Set basic order details
    this.orderForm.patchValue({
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
      notes: order.notes || "",
    })

    // Handle products
    if (order.products && order.products.length > 0) {
      // Clear the default product
      while (this.productsArray.length) {
        this.productsArray.removeAt(0)
      }

      // Add each product from the order
      order.products.forEach((product: any) => {
        this.productsArray.push(
          this.fb.group({
            name: [product.name, Validators.required],
            quantity: [product.quantity, [Validators.required, Validators.min(1)]],
            weight: [product.weight, Validators.required],
          }),
        )
      })
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
    const governmentValue = this.orderForm.get("government")?.value
    if (governmentValue) {
      this.cities = this.citiesByGovernment[governmentValue] || []

      // Reset city if it's not in the new list
      const cityControl = this.orderForm.get("city")
      if (cityControl && !this.cities.includes(cityControl.value)) {
        cityControl.setValue("")
      }
    } else {
      this.cities = []
    }
  }

  addProduct(): void {
    this.productsArray.push(this.createProductFormGroup())
  }

  removeProduct(index: number): void {
    if (this.productsArray.length > 1) {
      this.productsArray.removeAt(index)
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.orderForm)
      return
    }

    const formData = this.orderForm.value
    this.save.emit(formData)
  }

  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key)
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control)
      } else if (control) {
        control.markAsTouched()
      }
    })
  }
}
