import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MerchantService } from '../../../services/merchant.service';
import { City, MerchantResponse } from '../../../models/merchant.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-merchant-details',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss'],
})
export class MerchantDetailsComponent {
  @Input({ required: true }) merchantId!: string;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<string>();

  merchant = signal<MerchantResponse | null>(null);
  cities = signal<City[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private merchantService: MerchantService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    if (this.isVisible && this.merchantId) {
      this.loadMerchant();
      this.loadCities();
    }
  }

  loadMerchant(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (merchant: MerchantResponse) => {
        this.merchant.set(merchant);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load merchant details');
        this.isLoading.set(false);
      },
    });
  }

  loadCities(): void {
    this.merchantService.getCities().subscribe({
      next: (cities) => this.cities.set(cities),
      error: (err) => this.errorMessage.set('Failed to load cities'),
    });
  }

  getCityName(cityId: number): string {
    const city = this.cities().find((c) => c.id === cityId);
    return city ? city.name : 'Unknown';
  }

  onClose(): void {
    this.close.emit();
  }

  onEdit(): void {
    this.edit.emit(this.merchantId);
    this.router.navigate([`/merchants/edit/${this.merchantId}`]);
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }
}
