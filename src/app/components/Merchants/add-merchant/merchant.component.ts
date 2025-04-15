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
import { City, MerchantResponse } from '../../../models/merchant.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  cities = signal<City[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  isEditing = signal(false);
  merchantId = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.merchantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      storeName: ['', Validators.required],
      rejectedOrderPercentage: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      specialPickUp: [0, [Validators.required, Validators.min(0)]],
      cityIds: [[], Validators.required],
      specialPrices: this.fb.array([]),
    });

    // Initialize merchantId and isEditing
    this.merchantId.set(this.route.snapshot.paramMap.get('id'));
    this.isEditing.set(!!this.merchantId());
  }

  ngOnInit(): void {
    this.loadCities();
    if (!this.isEditing()) {
      this.addSpecialPrice(); // Ensure at least one special price in create mode
    }
    if (this.isEditing() && this.merchantId()) {
      this.loadMerchant(this.merchantId()!);
    }
  }

  get specialPrices(): FormArray<FormGroup> {
    return this.merchantForm.get('specialPrices') as FormArray<FormGroup>;
  }

  addSpecialPrice(cityId = '', specialPrice = 0): void {
    const specialPriceGroup = this.fb.group({
      cityId: [cityId, Validators.required],
      specialPrice: [specialPrice, [Validators.required, Validators.min(0)]],
    });
    this.specialPrices.push(specialPriceGroup);
  }

  removeSpecialPrice(index: number): void {
    if (this.specialPrices.length > 1) {
      this.specialPrices.removeAt(index);
    }
  }

  loadCities(): void {
    this.merchantService.getCities().subscribe({
      next: (cities) => this.cities.set(cities),
      error: (err) => this.errorMessage.set('Failed to load cities'),
    });
  }

  loadMerchant(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.merchantService.getMerchantById(id).subscribe({
      next: (merchant: MerchantResponse) => {
        this.merchantForm.patchValue({
          name: merchant.name,
          email: merchant.email,
          phoneNumber: merchant.phoneNumber,
          storeName: merchant.storeName,
          rejectedOrderPercentage: merchant.rejectedOrderPercentage,
          specialPickUp: merchant.specialPickUp,
          cityIds: merchant.merchantCities.map(Number),
        });
        this.specialPrices.clear();
        if (!merchant.specialPrices || merchant.specialPrices.length === 0) {
          this.addSpecialPrice(); // Ensure at least one entry
        } else {
          merchant.specialPrices.forEach((sp) =>
            this.addSpecialPrice(
              sp.cityId ? sp.cityId.toString() : '',
              sp.specialPrice || 0
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
    if (this.merchantForm.invalid) {
      this.merchantForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const request = {
      id: this.merchantId() || null,
      ...this.merchantForm.value,
      password: 'P@ssword123',
      cityIds: this.merchantForm.value.cityIds.map(Number),
      specialPrices: this.specialPrices.value.map((sp: any) => ({
        cityId: Number(sp.cityId),
        specialPrice: Number(sp.specialPrice),
      })),
    };
    console.log(request);
    const operation =
      this.isEditing() && this.merchantId()
        ? this.merchantService.updateMerchant(request)
        : this.merchantService.createMerchant(request);

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
