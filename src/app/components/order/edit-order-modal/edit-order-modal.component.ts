import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  OrderService,
  Order,
  UpdateOrderRequest,
  ShippingRepresentative,
} from '../../../services/order.service';

@Component({
  selector: 'app-edit-order-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-order-modal.component.html',
  styleUrls: ['./edit-order-modal.component.scss'],
})
export class EditOrderModalComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() orderId: string | null = null;
  @Input() orderData: Order | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  orderForm: FormGroup;
  orderStates = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  representatives: ShippingRepresentative[] = [];

  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.createOrderForm();
  }

  createOrderForm(): FormGroup {
    return this.fb.group({
      orderState: ['', Validators.required],
      shippigRepresentativeId: [''],
      amountReceived: [0, [Validators.required, Validators.min(0)]],
      notes: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isVisible'] &&
      this.isVisible &&
      this.representatives.length === 0
    ) {
      this.loadRepresentatives();
    }
    if (changes['orderData'] && this.orderData) {
      this.populateForm(this.orderData);
    }
    if (
      changes['orderId'] &&
      this.orderId &&
      (!this.orderData || this.orderData.id !== +this.orderId)
    ) {
      this.loadOrder();
    }
  }

  loadRepresentatives(): void {
    this.orderService.getShippingRepresentatives(1, 100).subscribe({
      next: (response) => {
        this.representatives = response.data;
        console.log('Loaded representatives:', this.representatives);
      },
      error: (err) => {
        console.error('Error fetching representatives:', err);
        alert('Failed to load shipping representatives.');
        this.representatives = [];
      },
    });
  }

  loadOrder(): void {
    if (this.orderId) {
      this.orderService.getOrderById(+this.orderId).subscribe({
        next: (order) => {
          this.orderData = order;
          this.populateForm(order);
        },
        error: (err) => {
          console.error('Error fetching order:', err);
          alert('Failed to load order details.');
        },
      });
    }
  }

  populateForm(order: Order): void {
    this.orderForm.patchValue({
      orderState: order.orderState || '',
      shippigRepresentativeId: order.shippigRepresentativeId || '',
      amountReceived: order.amountReceived || 0,
      notes: order.notes || '',
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.orderForm.reset();
    this.close.emit();
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.markFormGroupTouched(this.orderForm);
      return;
    }

    if (!this.orderId) {
      alert('Order ID is missing.');
      return;
    }

    const formData = this.orderForm.value;
    const updateRequest: UpdateOrderRequest = {
      orderState: formData.orderState,
      shippigRepresentativeId: formData.shippigRepresentativeId || null,
      amountReceived: Number(formData.amountReceived),
      notes: formData.notes || null,
    };

    this.orderService.updateOrder(+this.orderId, updateRequest).subscribe({
      next: () => {
        this.orderForm.reset();
        this.save.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Error updating order:', err);
        alert(err.message);
      },
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
