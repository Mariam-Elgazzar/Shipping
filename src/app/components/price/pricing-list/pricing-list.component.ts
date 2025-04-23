import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PricingService } from '../../../services/pricing.service';
import { Pricing } from '../../../models/pricing.model';

@Component({
  selector: 'app-pricing-list',
  templateUrl: './pricing-list.component.html',
  styleUrls: ['./pricing-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
  ],
})
export class PricingListComponent implements OnInit {
  pricings: Pricing[] = [];
  pricingsarr!: any;
  filteredPricings: Pricing[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  totalCount: number = 0;

  constructor(private pricingService: PricingService, public router: Router) {}

  ngOnInit(): void {
    this.loadPricings();
  }

  loadPricings(): void {
    this.loading = true;
    this.pricingService.getAllPricings().subscribe({
      next: (response) => {
        this.pricingsarr = response[0];
        // this.pricings = [...response];
        // this.filteredPricings = response[0];

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pricings', err);
        this.loading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPricings();
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPricings = this.pricings.filter((pricing) =>
      pricing.standardWeight.toString().includes(query)
    );
  }

  viewPricing(pricing: Pricing): void {
    this.router.navigate(['/pricings', pricing.id]);
  }

  editPricing(pricing: Pricing): void {
    this.router.navigate(['/pricings', pricing.id, 'edit']);
  }

  deletePricing(pricing: Pricing): void {
    if (
      confirm(
        `Are you sure you want to delete pricing with weight ${pricing.standardWeight} kg?`
      )
    ) {
      this.pricingService.deletePricing(pricing.id).subscribe({
        next: () => {
          this.loadPricings(); // Refresh the list
        },
        error: (err) => console.error('Error deleting pricing', err),
      });
    }
  }
}
