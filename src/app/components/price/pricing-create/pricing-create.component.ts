import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PricingService } from '../../../services/pricing.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pricing-create',
  templateUrl: './pricing-create.component.html',
  styleUrls: ['./pricing-create.component.scss'],
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
export class PricingAddComponent implements OnInit {
  pricingForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private pricingService: PricingService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.pricingForm = this.fb.group({
      standardWeight: ['', [Validators.required, Validators.min(0)]],
      villagePrice: ['', [Validators.required, Validators.min(0)]],
      kGprice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.pricingForm.invalid) {
      Object.values(this.pricingForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const pricingData = this.pricingForm.value;
    this.createPricing(pricingData);
  }

  createPricing(pricing: { standardWeight: number; villagePrice: number; kGprice: number }): void {
    this.isLoading = true;
    this.pricingService.createPricing(pricing).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/pricings']);
      },
      error: (err) => {
        console.error('Error creating pricing', err);
        this.isLoading = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/pricings']);
  }
}