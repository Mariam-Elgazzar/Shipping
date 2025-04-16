import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PricingService } from '../../../services/pricing.service';
import { PricingResponse } from '../../../models/pricing.model';
 
@Component({
  selector: 'app-pricing-details',
  templateUrl: './pricing-details.component.html',
  styleUrls: ['./pricing-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class PricingDetailsComponent implements OnInit {
  pricing: PricingResponse | null = null;
  isLoading = false;
  pricingId: number | null = null;

  constructor(
    private pricingService: PricingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pricingId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.pricingId) {
      this.loadPricingData();
    }
  }

  loadPricingData(): void {
    if (!this.pricingId) return;
    this.isLoading = true;
    this.pricingService.getPricingById(this.pricingId).subscribe({
      next: (pricing) => {
        this.pricing = pricing;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading pricing details', err);
        this.isLoading = false;
      },
    });
  }

  editPricing(): void {
    if (this.pricingId) {
      this.router.navigate(['/pricings', this.pricingId, 'edit']);
    }
  }

  backToList(): void {
    this.router.navigate(['/pricings']);
  }
}