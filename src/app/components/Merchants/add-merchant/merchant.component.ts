import { Component, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../../services/merchant.service';
import { City } from '../../../models/merchant.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Branch, OrderService } from '../../../services/order.service';

export interface SpecialDeliveryPrice {
  cityId: number;
  cityName: string;
  specialPreice: number;
}

export interface MerchantResponse {
  id: string;
  address: string;
  name: string;
  startWorkDDate: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  storeName: string;
  rejectedOrderPrecentage: number;
  specialPickUp: number;
  merchantBranches: number[];
  specialDeliveryPrices: SpecialDeliveryPrice[];
}

export interface CreateMerchantRequest {
  id: string | null;
  address: string;
  name: string;
  startWorkDDate: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  storeName: string;
  rejectedOrderPrecentage: number;
  specialPickUp: number;
  branchesIds: number[];
  specialDeliveryPrices: SpecialDeliveryPrice[];
}
@Component({
  selector: 'app-merchant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss'],
})
export class MerchantFormComponent {
  merchantForm: FormGroup;
  Branches = signal<Branch[]>([]);
  Cities = signal<City[]>([]);
  isLoading = signal(false);
  isLoadingBranches = signal(false);
  isLoadingCities = signal(false);
  errorMessage = signal('');
  isEditing = signal(false);
  merchantId = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.merchantForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      startWorkDDate: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      storeName: ['', Validators.required],
      rejectedOrderPrecentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      specialPickUp: [0, [Validators.required, Validators.min(0)]],
      branchesIds: [[], Validators.required],
      specialDeliveryPrices: this.fb.array([]),
    });

    this.merchantId.set(this.route.snapshot.paramMap.get('id'));
    this.isEditing.set(!!this.merchantId());
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadCities();
    if (!this.isEditing()) {
      this.addSpecialDeliveryPrice();
    }
    if (this.isEditing() && this.merchantId()) {
      this.loadMerchant(this.merchantId()!);
    }
  }

  get specialDeliveryPrices(): FormArray<FormGroup> {
    return this.merchantForm.get(
      'specialDeliveryPrices'
    ) as FormArray<FormGroup>;
  }

  addSpecialDeliveryPrice(cityId = '', cityName = '', specialPreice = 0): void {
    const specialDeliveryPriceGroup = this.fb.group({
      cityId: [cityId, Validators.required],
      cityName: [cityName, Validators.required],
      specialPreice: [specialPreice, [Validators.required, Validators.min(0)]],
    });
    this.specialDeliveryPrices.push(specialDeliveryPriceGroup);
  }

  removeSpecialDeliveryPrice(index: number): void {
    if (this.specialDeliveryPrices.length > 1) {
      this.specialDeliveryPrices.removeAt(index);
    }
  }

  loadBranches(): void {
    this.isLoadingBranches.set(true);
    this.errorMessage.set('');
    this.orderService
      .getBranches(1, 100, undefined, undefined, false)
      .subscribe({
        next: (branches) => {
          this.Branches.set(
            branches.data.filter((branch) => !branch.isDeleted)
          );
          this.isLoadingBranches.set(false);
        },
        error: (err) => {
          this.errorMessage.set('Failed to load Branches. Please try again.');
          this.isLoadingBranches.set(false);
        },
      });
  }

  loadCities(): void {
    this.isLoadingCities.set(true);
    this.errorMessage.set('');
    this.orderService.getCities().subscribe({
      next: (cities) => {
        this.Cities.set(cities.data.filter((city) => city.id));
        this.isLoadingCities.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load Cities. Please try again.');
        this.isLoadingCities.set(false);
      },
    });
  }

  retryLoadBranches(): void {
    this.loadBranches();
  }

  loadMerchant(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.merchantService.getMerchantById(id).subscribe({
      next: (merchant: MerchantResponse) => {
        this.merchantForm.patchValue({
          address: merchant.address,
          name: merchant.name,
          startWorkDDate: merchant.startWorkDDate
            ? new Date(merchant.startWorkDDate).toISOString().slice(0, 16)
            : '',
          userName: merchant.userName,
          email: merchant.email,
          phoneNumber: merchant.phoneNumber,
          storeName: merchant.storeName,
          rejectedOrderPrecentage: merchant.rejectedOrderPrecentage,
          specialPickUp: merchant.specialPickUp,
          branchesIds: merchant.merchantBranches.map(Number),
        });
        this.specialDeliveryPrices.clear();
        if (
          !merchant.specialDeliveryPrices ||
          merchant.specialDeliveryPrices.length === 0
        ) {
          this.addSpecialDeliveryPrice();
        } else {
          merchant.specialDeliveryPrices.forEach((sp) =>
            this.addSpecialDeliveryPrice(
              sp.cityId ? sp.cityId.toString() : '',
              sp.cityName || '',
              sp.specialPreice || 0
            )
          );
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(
          err.message ||
            `Failed to ${this.isEditing() ? 'update' : 'create'} merchant`
        );
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    // if (this.merchantForm.invalid) {
    //   this.merchantForm.markAllAsTouched();
    //   return;
    // }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const selectedCities = this.Cities().filter((city) =>
      this.specialDeliveryPrices.value.some(
        (sp: any) => Number(sp.cityId) === city.id
      )
    );

    const request = {
      id: this.merchantId() || null,
      address: this.merchantForm.value.address,
      name: this.merchantForm.value.name,
      startWorkDDate: new Date(
        this.merchantForm.value.startWorkDDate
      ).toISOString(),
      userName: this.merchantForm.value.userName,
      email: this.merchantForm.value.email,
      phoneNumber: this.merchantForm.value.phoneNumber,
      password: this.merchantForm.value.password,
      storeName: this.merchantForm.value.storeName,
      rejectedOrderPrecentage: Number(
        this.merchantForm.value.rejectedOrderPrecentage
      ),
      specialPickUp: Number(this.merchantForm.value.specialPickUp),
      branchesIds: this.merchantForm.value.branchesIds.map(Number),
      specialDeliveryPrices: this.specialDeliveryPrices.value.map(
        (sp: any, index: number) => ({
          cityId: Number(sp.cityId),
          cityName:
            selectedCities.find((city) => city.id === Number(sp.cityId))
              ?.name || '',
          specialPreice: Number(sp.specialPreice),
        })
      ),
    };

    const operation =
      this.isEditing() && this.merchantId()
        ? this.merchantService.updateMerchant(request)
        : this.merchantService.createMerchant(request);
    console.log('Merchant Data:', request);
    operation.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/merchants']);
      },
      error: (err) => {
        this.errorMessage.set(
          err.message ||
            `Failed to ${this.isEditing() ? 'update' : 'create'} merchant`
        );
        this.isLoading.set(false);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/merchants']);
  }
}
