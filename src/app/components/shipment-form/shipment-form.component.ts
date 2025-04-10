import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ShipmentFormComponent implements OnInit {
  shipmentForm!: FormGroup;
  isEditMode = false;

  statusOptions = [
    'Pending',
    'Processing',
    'In Transit',
    'Delivered',
    'Delayed',
    'Cancelled',
  ];

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private dialogRef: MatDialogRef<ShipmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Shipment
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data.id;

    this.shipmentForm = this.fb.group({
      trackingNumber: [
        this.data.trackingNumber || this.generateTrackingNumber(),
        Validators.required,
      ],
      origin: [this.data.origin || '', Validators.required],
      destination: [this.data.destination || '', Validators.required],
      status: [this.data.status || 'Pending', Validators.required],
      date: [this.data.date || new Date(), Validators.required],
      estimatedDelivery: [
        this.data.estimatedDelivery || this.getDefaultDeliveryDate(),
      ],
      cost: [this.data.cost || 0, [Validators.required, Validators.min(0)]],
      weight: [this.data.weight || 0, [Validators.required, Validators.min(0)]],
      notes: [this.data.notes || ''],
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.invalid) {
      return;
    }

    const shipment = {
      ...this.data,
      ...this.shipmentForm.value,
    };

    if (this.isEditMode) {
      this.shipmentService.updateShipment(shipment).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.shipmentService.createShipment(shipment).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  generateTrackingNumber(): string {
    // Generate a random tracking number
    return (
      'TRK' +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0')
    );
  }

  getDefaultDeliveryDate(): Date {
    // Set default delivery date to 3 days from now
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }
}
