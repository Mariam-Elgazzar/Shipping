import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Delivery, SaleTypeEnum } from '../../../models/delivery.model';
import { DeliveryService } from '../../../services/delivery.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { DeliveryServiceModel } from '../../../models/DeliveryServiceModel';

// @Component({ 
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule], // Must include ReactiveFormsModule
//   templateUrl: './delivery-update.component.html',
//   styleUrls: ['./delivery-update.component.scss']
// })
// export class DeliveryUpdateComponent implements OnInit {
//   deliveryForm: FormGroup;
//   deliveryId: string | null = null;
//   isLoading = false;
//   employees: User[] = [];
//   saleTypes = Object.values(SaleTypeEnum);

//   constructor(
//     private fb: FormBuilder,
//     private deliveryService: DeliveryService,
//     private userService: UserService,
//     private route: ActivatedRoute,
//     public router: Router
//   ) {
//     this.deliveryForm = this.fb.group({
//       name: [''],
//       email: ['', [Validators.email]],
//       password: ['', [Validators.minLength(6)]],
//       branch: [''],
//       government: [''],
//       city: [''],
//       phone: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
//       address: [''],
//       saleType: [SaleTypeEnum.Percentage, Validators.required],
//       salePresentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
//       empId: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.deliveryId = this.route.snapshot.paramMap.get('id');
//     this.loadEmployees();
    
//     if (this.deliveryId) {
//       this.loadDelivery(this.deliveryId);
//     }
//   }

//   loadEmployees(): void {
//     this.userService.getEmployees().subscribe(employees => {
//       this.employees = employees;
//     });
//   }

//   loadDelivery(id: string): void {
//     this.isLoading = true;
//     this.deliveryService.getDeliveryById(id).subscribe({
//       next: (delivery) => {
//         this.deliveryForm.patchValue({
//           ...delivery,
//           // Map any differently named properties here
//         });
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading delivery', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.deliveryForm.invalid || !this.deliveryId) return;

//     this.isLoading = true;
//     const deliveryData: Delivery = {
//       ...this.deliveryForm.value,
//       userId: this.deliveryId
//     };

//     this.deliveryService.updateDelivery(this.deliveryId, deliveryData).subscribe({
//       next: () => {
//         this.isLoading = false;
//         this.router.navigate(['/deliveries']);
//       },
//       error: (error) => {
//         console.error('Error updating delivery', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   getSaleTypeLabel(type: SaleTypeEnum): string {
//     return type.toString();
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DeliveryService } from '../../services/delivery.service';
// import { Delivery, SaleTypeEnum } from '../../models/delivery.model';
// import { DeliveryServiceModel } from '../../models/delivery-service.model';
// import { CommonModule } from '@angular/common';

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
          branch: serviceDelivery.branchLocation,
          branchName: serviceDelivery.branchName,
          status: serviceDelivery.status,
          phone: serviceDelivery.phone,
          // Map other fields as needed
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
    const formValue = this.deliveryForm.value;

    // Create service-compatible object
    const serviceDelivery: DeliveryServiceModel = {
      id: this.deliveryId,
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      branchLocation: formValue.branch || '',
      branchName: formValue.branchName,
      status: formValue.status
    };

    this.deliveryService.updateDelivery(this.deliveryId, serviceDelivery).subscribe({
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