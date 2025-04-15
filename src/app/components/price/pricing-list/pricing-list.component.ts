import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { PricingService} from '../../../services/pricing.service';
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
  ],
})
export class PricingListComponent implements OnInit {
  pricings: Pricing[] = [];
  filteredPricings: Pricing[] = [];
  searchQuery: string = '';
  loading: boolean = false;

  constructor(private pricingService: PricingService, private router: Router) {}

  ngOnInit(): void {
    this.loadPricings();
  }

  loadPricings(): void {
    this.loading = true;
    this.pricingService.getAllPricings().subscribe({
      next: (pricings) => {
        this.pricings = pricings.filter((p) => !p.isDeleted);
        this.filteredPricings = [...this.pricings];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pricings', err);
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredPricings = this.pricings.filter((pricing) =>
      pricing.standardWeight.toString().includes(query)
    );
  }

  addPricing(): void {
    this.router.navigate(['price/add']);
  }

  // viewPricing(pricing: Pricing): void {
  //   this.router.navigate(['/price/edit', pricing.id]);
  // }

  editPricing(pricing: Pricing): void {
    this.router.navigate([`price/edit/${pricing.id}`]);
  }

  deletePricing(pricing: Pricing): void {
    if (confirm(`Are you sure you want to delete pricing with weight ${pricing.standardWeight} kg?`)) {
      this.pricingService.deletePricing(pricing.id).subscribe({
        next: () => {
          this.loadPricings(); // Refresh the list
        },
        error: (err) => console.error('Error deleting pricing', err),
      });
    }
  }
}