import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantService } from '../../../services/merchant.service';

@Component({
  selector: 'app-merchant-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merchant-details.component.html',

  styleUrls: ['./merchant-details.component.scss'],
})
export class MerchantDetailsComponent implements OnChanges {
  @Input() merchantId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  merchantDetails: any = null;

  constructor(private merchantService: MerchantService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['merchantId'] && this.merchantId) {
      this.loadMerchantDetails();
    }
  }

  loadMerchantDetails(): void {
    if (!this.merchantId) return;

    this.merchantService.getMerchantDetails(this.merchantId).subscribe(
      (details) => {
        this.merchantDetails = details;
      },
      (error) => {
        console.error('Error loading merchant details:', error);
      }
    );
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onEdit(): void {
    console.log('Edit merchant details:', this.merchantId);
  }
}
