import { Component, OnInit } from '@angular/core';
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
import { catchError, of } from 'rxjs';
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
export class MerchantFormComponent implements OnInit {
  merchantForm: FormGroup;
  cities: City[] = [];
  isLoading = false;
  errorMessage = '';
  isEditing = false;
  merchantId: string | null = null;

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
  }

  ngOnInit(): void {
    this.merchantId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.merchantId;
    this.loadCities();
    if (!this.isEditing) {
      this.addSpecialPrice(); // Ensure at least one special price in create mode
    }
    if (this.isEditing && this.merchantId) {
      this.loadMerchant(this.merchantId);
    }
    // Debug FormArray state
    console.log('Initial specialPrices:', this.specialPrices.value);
  }

  get specialPrices(): FormArray {
    return this.merchantForm.get('specialPrices') as FormArray;
  }

  addSpecialPrice(cityId = '', specialPrice = 0): void {
    this.specialPrices.push(
      this.fb.group({
        cityId: [cityId, Validators.required],
        specialPrice: [specialPrice, [Validators.required, Validators.min(0)]],
      })
    );
    // Debug after adding
    console.log('Added specialPrice, new state:', this.specialPrices.value);
  }

  removeSpecialPrice(index: number): void {
    if (this.specialPrices.length > 1) {
      this.specialPrices.removeAt(index);
      // Debug after removing
      console.log('Removed specialPrice, new state:', this.specialPrices.value);
    }
  }

  loadCities(): void {
    this.merchantService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load cities';
      },
    });
  }

  loadMerchant(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.merchantService.getMerchantById(id).subscribe({
      next: (merchant: MerchantResponse) => {
        this.merchantForm.patchValue({
          id: merchant.id,
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
          merchant.specialPrices.forEach((sp) => {
            this.addSpecialPrice(
              sp.cityId ? sp.cityId.toString() : '',
              sp.specialPrice || 0
            );
          });
        }
        this.isLoading = false;
        // Debug after loading
        console.log('Loaded merchant specialPrices:', this.specialPrices.value);
      },
      error: (err) => {
        this.errorMessage =
          err.message ||
          `Failed to ${this.isEditing ? 'update' : 'create'} merchant`;
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.merchantForm.invalid) {
      this.merchantForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const request = {
      id: this.merchantId || undefined,
      ...this.merchantForm.value,
      cityIds: this.merchantForm.value.cityIds.map(Number),
      specialPrices: this.specialPrices.value.map((sp: any) => ({
        cityId: Number(sp.cityId),
        specialPrice: Number(sp.specialPrice),
      })),
    };

    const operation =
      this.isEditing && this.merchantId
        ? this.merchantService.updateMerchant(request)
        : this.merchantService.createMerchant(request);

    operation
      .pipe
      //   catchError((err: any) => {
      //     this.errorMessage =
      //       (err?.error?.message ||
      //         err?.message ||
      //         'An unexpected error occurred') +
      //       ` while trying to ${
      //         this.isEditing ? 'update' : 'create'
      //       } the merchant.`;
      //     this.isLoading = false;
      //     return of(null);
      //   })
      // )
      // .subscribe((response) => {
      //   if (response) {
      //     this.isLoading = false;
      //     this.router.navigate(['/merchants']);
      //   }
      // }
      ();
  }

  cancel(): void {
    this.router.navigate(['/merchants']);
  }
}
