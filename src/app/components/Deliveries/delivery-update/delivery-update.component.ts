import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Delivery, SaleTypeEnum } from '../../../models/delivery.model';
import { DeliveryService } from '../../../services/delivery.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { DeliveryServiceModel } from '../../../models/DeliveryServiceModel';

@Component({
  selector: 'app-delivery-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delivery-update.component.html',
  styleUrls: ['./delivery-update.component.scss']
})
export class DeliveryUpdateComponent implements OnInit {
  deliveryForm: FormGroup;
  deliveryId: string | null = null;
  isLoading = false;
  saleTypes = Object.values(SaleTypeEnum);

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.deliveryForm = this.fb.group({
      name: [''],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      branch: [''],
      branchName: ['', Validators.required],
      status: ['true', Validators.required],
      government: [''],
      city: [''],
      phone: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      address: [''],
      saleType: [SaleTypeEnum.Percentage, Validators.required],
      salePercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      empId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.deliveryId = this.route.snapshot.paramMap.get('id');
    if (this.deliveryId) {
      this.loadDelivery(this.deliveryId);
    }
  }

  loadDelivery(id: string): void {
    this.isLoading = true;
    this.deliveryService.getDeliveryById(id).subscribe({
      next: (serviceDelivery) => {
        this.deliveryForm.patchValue({
          name: serviceDelivery.name,
          email: serviceDelivery.email,
          phoneNumber: serviceDelivery.phone,
          branchName: serviceDelivery.branchName,
          discountType: serviceDelivery.branchLocation,
          companyPercentage: serviceDelivery.branchName,
          // governorateIds: serviceDelivery. || []
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading delivery', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.invalid || !this.deliveryId) return;

    this.isLoading = true;

    const requestData = {
      ...this.deliveryForm.value,
      id: this.deliveryId
    };

    this.deliveryService.updateDelivery(this.deliveryId, requestData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/deliveries']);
      },
      error: (error) => {
        console.error('Error updating delivery', error);
        this.isLoading = false;
      }
    });
  }


  getSaleTypeLabel(type: SaleTypeEnum): string {
    return type.toString();
  }
}
