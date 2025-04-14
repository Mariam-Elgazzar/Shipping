import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { LocationService } from '../../../services/location.service';
// import { Delivery, SaleTypeEnum } from '../../models/delivery.model';
import { User } from '../../../models/user.model';
import { DeliveryService } from '../../../services/delivery.service';
import { Delivery, SaleTypeEnum } from '../../../models/delivery.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  standalone: true, // إضافة هذا السطر لتعريف الكومبوننت كـ "standalone"
  imports: [ReactiveFormsModule, CommonModule],
})
export class DeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  users: User[] = [];
  employees: User[] = [];
  governments: string[] = [];
  cities: { [government: string]: string[] } = {};
  availableCities: string[] = [];
  saleTypes = Object.values(SaleTypeEnum);
  isLoading = false;
  isEditing = false;
  currentDeliveryId: string | null = null;
  deliveries: Delivery[] = []; // This would be populated from your service

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private userService: UserService,
    private locationService: LocationService
  ) {
    this.deliveryForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        this.isEditing ? [] : [Validators.required, Validators.minLength(6)],
      ],
      branch: ['', Validators.required],
      government: ['', Validators.required],
      city: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
      address: ['', Validators.required],
      saleType: [SaleTypeEnum.Percentage, Validators.required],
      salePercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      empId: ['', Validators.required],
    });

    // Listen for government changes to update cities
    this.deliveryForm
      .get('government')
      ?.valueChanges.subscribe((government) => {
        if (government) {
          this.availableCities = this.cities[government] || [];
          this.deliveryForm.get('city')?.setValue('');
        }
      });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadEmployees();
    this.loadLocations();
    // this.loadDeliveries();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.isLoading = false;
      },
    });
  }

  loadEmployees(): void {
    this.userService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees', error);
      },
    });
  }

  loadLocations(): void {
    this.locationService.getGovernments().subscribe({
      next: (governments) => {
        this.governments = governments;
      },
      error: (error) => {
        console.error('Error loading governments', error);
      },
    });

    this.locationService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        console.error('Error loading cities', error);
      },
    });
  }

  // loadDeliveries(): void {
  //   this.isLoading = true;
  //   this.deliveryService.getDeliveries().subscribe({
  //     next: (deliveries) => {
  //       this.deliveries = deliveries;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading deliveries', error);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.deliveryForm.controls).forEach((key) => {
        this.deliveryForm.get(key)?.markAsTouched();
      });
      return;
    }

    const deliveryData: Delivery = this.deliveryForm.value;

    if (this.isEditing && this.currentDeliveryId) {
      // If editing and no password was entered, remove it from the data
      if (!deliveryData.password) {
        delete deliveryData.password;
      }
      // this.updateDelivery(deliveryData);
    } else {
      // this.createDelivery(deliveryData);
    }
  }

  // createDelivery(delivery: Delivery): void {
  //   this.isLoading = true;
  //   this.deliveryService.createDelivery(delivery).subscribe({
  //     next: () => {
  //       this.resetForm();
  //       this.loadDeliveries();
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error creating delivery', error);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  // updateDelivery(delivery: Delivery): void {
  //   if (!this.currentDeliveryId) return;

  //   this.isLoading = true;
  //   this.deliveryService
  //     .updateDelivery(this.currentDeliveryId, delivery)
  //     .subscribe({
  //       next: () => {
  //         this.resetForm();
  //         this.loadDeliveries();
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         console.error('Error updating delivery', error);
  //         this.isLoading = false;
  //       },
  //     });
  // }

  editDelivery(delivery: Delivery): void {
    this.isEditing = true;
    this.currentDeliveryId = delivery.userId;

    // Set the government first so cities will be loaded
    this.deliveryForm.get('government')?.setValue(delivery.government);

    // Then patch the rest of the values
    this.deliveryForm.patchValue({
      userId: delivery.userId,
      name: delivery.name,
      email: delivery.email,
      // Don't patch password for security reasons
      branch: delivery.branch,
      city: delivery.city,
      phone: delivery.phone,
      address: delivery.address,
      saleType: delivery.saleType,
      salePercentage: delivery.salePresentage,
      empId: delivery.empId,
    });

    // Update password validator
    const passwordControl = this.deliveryForm.get('password');
    if (passwordControl) {
      passwordControl.setValidators(
        this.isEditing ? [] : [Validators.required, Validators.minLength(6)]
      );
      passwordControl.updateValueAndValidity();
    }
  }

  resetForm(): void {
    this.deliveryForm.reset({
      userId: '',
      name: '',
      email: '',
      password: '',
      branch: '',
      government: '',
      city: '',
      phone: '',
      address: '',
      saleType: SaleTypeEnum.Percentage,
      salePercentage: 0,
      empId: '',
    });
    this.isEditing = false;
    this.currentDeliveryId = null;
    this.availableCities = [];
  }

  cancel(): void {
    this.resetForm();
  }

  deleteDelivery(userId: string): void {
    if (confirm('Are you sure you want to delete this delivery?')) {
      this.isLoading = true;
      this.deliveryService.deleteDelivery(userId).subscribe({
        next: () => {
          // this.loadDeliveries();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting delivery', error);
          this.isLoading = false;
        },
      });
    }
  }

  getSaleTypeLabel(saleType: SaleTypeEnum): string {
    switch (saleType) {
      case SaleTypeEnum.Percentage:
        return 'Percentage';
      case SaleTypeEnum.FixedAmount:
        return 'Fixed Amount';
      case SaleTypeEnum.Commission:
        return 'Commission';
      default:
        return saleType;
    }
  }

  getUserName(userId: string): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  getEmployeeName(empId: string): string {
    const employee = this.employees.find((e) => e.id === empId);
    return employee ? employee.username : 'Unknown';
  }
}
