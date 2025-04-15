import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PricingService } from '../../../services/pricing.service';
import { PricingRequest, PricingResponse } from '../../../models/pricing.model';
// import { PricingService, PricingRequest, PricingResponse } from '../../../services/pricing.service';

@Component({
  selector: 'app-pricing-update',
  templateUrl: './pricing-update.component.html',
  styleUrls: ['./pricing-update.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class PricingUpdateComponent implements OnInit {
  pricingForm!: FormGroup;
  isLoading = false;
  pricingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingService,
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Route ID param:', idParam);
    this.pricingId = idParam ? Number(idParam) : null;
    if (this.pricingId && !isNaN(this.pricingId)) {
      this.loadPricingData();
    } else {
      console.error('Invalid pricing ID:', idParam);
      this.snackBar.open('Invalid pricing ID', 'Close', { duration: 3000 });
      this.router.navigate(['/pricings']);
    }
  }

  private initForm(): void {
    this.pricingForm = this.fb.group({
      standardWeight: ['', [Validators.required, Validators.min(0)]],
      villagePrice: ['', [Validators.required, Validators.min(0)]],
      kGprice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  loadPricingData(): void {
    if (!this.pricingId) return;
    this.isLoading = true;
    console.log('Fetching pricing for ID:', this.pricingId);
    this.pricingService.getPricingById(this.pricingId).subscribe({
      next: (pricing: PricingResponse) => {
        console.log('API Response:', pricing);
        this.pricingForm.patchValue({
          standardWeight: pricing.standardWeight,
          villagePrice: pricing.villagePrice,
          kGprice: pricing.kGprice,
        });
        console.log('Form after patch:', this.pricingForm.value);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pricing:', err);
        this.snackBar.open(err.message || 'Failed to load pricing', 'Close', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/pricings']);
      },
    });
  }

  onSubmit(): void {
    if (this.pricingForm.invalid) {
      console.log('Form invalid:', this.pricingForm.errors);
      Object.values(this.pricingForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.pricingId) {
      const pricingData: PricingRequest & { id: number } = {
        id: this.pricingId,
        ...this.pricingForm.value,
      };
      console.log('Submitting update:', pricingData);
      this.updatePricing(pricingData);
    }
  }

  updatePricing(pricing: PricingRequest & { id: number }): void {
    this.isLoading = true;
    this.pricingService.updatePricing(pricing).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Pricing updated successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/pricings']);
      },
      error: (err) => {
        console.error('Error updating pricing:', err);
        this.snackBar.open(err.message || 'Failed to update pricing', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/pricings']);
  }
}