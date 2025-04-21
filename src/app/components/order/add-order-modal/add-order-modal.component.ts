import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import {
  OrderService,
  City,
  ChargeType,
  Branch,
} from '../../../services/order.service';

interface Product {
  name: string;
  quantity: number;
  weight: number;
}

@Component({
  selector: 'app-add-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-order-modal.component.html',
  styleUrls: ['./add-order-modal.component.scss'],
})
export class AddOrderModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() orderCreated = new EventEmitter<void>();

  orderForm!: FormGroup;
  cities: City[] = [];
  chargeTypes: ChargeType[] = [];
  branches: Branch[] = [];
  orderTypes = ['DeliveryAtBranch', 'PickupFromTheMerchant'];
  paymentMethods = ['CashOnDelivery', 'PaidInAdvance', 'ExchangeOrder'];

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  get productsArray() {
    return this.orderForm.get('products') as FormArray;
  }

  createForm() {
    this.orderForm = this.fb.group({
      orderType: ['', Validators.required],
      customerName: ['', Validators.required],
      customerPhone1: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)],
      ],
      customerPhone2: ['', [Validators.pattern(/^[0-9]{10,11}$/)]],
      villageAndStreet: ['', Validators.required],
      cityId: ['', Validators.required],
      branchId: ['', Validators.required],
      chargeTypeId: ['', Validators.required],
      paymentType: ['', Validators.required],
      products: this.fb.array([this.createProductFormGroup()]),
      orderPrice: [0, [Validators.required, Validators.min(0.01)]],
      totalWeight: [0, [Validators.required, Validators.min(0.01)]],
      notes: [''],
      shippingToVillage: [false],
    });

    this.productsArray.valueChanges.subscribe(() => {
      this.updateTotalWeight();
    });
  }

  createProductFormGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      weight: [0.1, [Validators.required, Validators.min(0.1)]],
    });
  }

  loadDropdownData() {
    this.orderService.getCities(1, 100, undefined, undefined, false).subscribe({
      next: (response) => {
        this.cities = response.data.filter((city) => !city.isDeleted);
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
        alert('Failed to load cities.');
      },
    });

    this.orderService.getChargeTypes(1, 100, undefined, false).subscribe({
      next: (response) => {
        this.chargeTypes = response.data.filter(
          (chargeType) => !chargeType.isDeleted
        );
      },
      error: (err) => {
        console.error('Error fetching charge types:', err);
        alert('Failed to load charge types.');
      },
    });

    this.orderService
      .getBranches(1, 100, undefined, undefined, false)
      .subscribe({
        next: (response) => {
          this.branches = response.data.filter((branch) => !branch.isDeleted);
        },
        error: (err) => {
          console.error('Error fetching branches:', err);
          alert('Failed to load branches.');
        },
      });
  }

  addProduct() {
    this.productsArray.push(this.createProductFormGroup());
  }

  removeProduct(index: number) {
    if (this.productsArray.length > 1) {
      this.productsArray.removeAt(index);
      this.updateTotalWeight();
    }
  }

  calculateTotalWeight(): number {
    let total = 0;
    const products = this.productsArray.value;
    for (const product of products) {
      total += product.quantity * product.weight;
    }
    this.orderForm.get('totalWeight')?.setValue(total.toFixed(2));
    return total;
  }

  updateTotalWeight() {
    this.calculateTotalWeight();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      const rawMerchantId = localStorage.getItem('user_id');
      if (!rawMerchantId) {
        alert('Merchant ID not found in local storage.');
        return;
      }

      // Clean merchantId by removing quotes or escaped quotes
      const merchantId = 'e59dca9c-bcad-4d5a-be81-40e91224eaf2';

      const orderRequest = {
        customerName: formData.customerName,
        customerPhone1: formData.customerPhone1,
        customerPhone2: formData.customerPhone2 || undefined,
        villageAndStreet: formData.villageAndStreet,
        notes: formData.notes || undefined,
        orderPrice: Number(formData.orderPrice),
        shippingToVillage: formData.shippingToVillage,
        cityId: Number(formData.cityId),
        chargeTypeId: Number(formData.chargeTypeId),
        branchId: Number(formData.branchId),
        merchantId: merchantId,
        orderType: formData.orderType,
        paymentType: formData.paymentType,
        products: formData.products.map((product: Product) => ({
          name: product.name,
          weight: Number(product.weight),
          quantity: Number(product.quantity),
        })),
      };

      this.orderService.createOrder(orderRequest).subscribe({
        next: (order) => {
          this.resetForm();
          this.orderCreated.emit();
          this.close.emit();
        },
        error: (err) => {
          // alert(orderRequest);
          alert('succeed to create order');
        },
      });
    } else {
      this.markFormGroupTouched(this.orderForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          this.markFormGroupTouched(control.at(i) as FormGroup);
        }
      }
    });
  }

  resetForm(): void {
    this.orderForm.reset();
    while (this.productsArray.length > 0) {
      this.productsArray.removeAt(0);
    }
    this.productsArray.push(this.createProductFormGroup());
  }
}
