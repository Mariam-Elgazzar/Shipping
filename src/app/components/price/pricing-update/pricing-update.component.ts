import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PricingService } from '../../../services/pricing.service';
import { PricingRequest, PricingResponse } from '../../../models/pricing.model';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.pricingId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.pricingId) {
      this.loadPricingData();
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
    this.pricingService.getPricingById(this.pricingId).subscribe({
      next: (pricing: PricingResponse) => {
        this.pricingForm.patchValue({
          standardWeight: pricing.standardWeight,
          villagePrice: pricing.villagePrice,
          kGprice: pricing.kGprice,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pricing', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.pricingForm.invalid) {
      Object.values(this.pricingForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    if (this.pricingId) {
      const pricingData: PricingRequest & { id: number } = {
        id: this.pricingId,
        ...this.pricingForm.value,
      };
      this.updatePricing(pricingData);
    }
  }

  updatePricing(pricing: PricingRequest & { id: number }): void {
    this.isLoading = true;
    this.pricingService.updatePricing(pricing).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/pricings']);
      },
      error: (err) => {
        console.error('Error updating pricing', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/pricings']);
  }
}