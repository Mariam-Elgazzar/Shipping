import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss'],
})
export class CityDetailsComponent implements OnChanges {
  @Input() cityId: number | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  cityDetails: City | null = null;

  constructor(private cityService: CityService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityId'] && this.cityId !== null) {
      this.loadCityDetails();
    }
  }

  loadCityDetails(): void {
    if (!this.cityId) return;

    this.cityService.getCityDetails(this.cityId).subscribe({
      next: (details) => {
        this.cityDetails = details;
      },
      error: (error) => {
        console.error('Error loading city details:', error);
        alert('Failed to load city details.');
      },
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.cityDetails = null;
    this.close.emit();
  }

  onEdit(): void {
    console.log('Edit city details:', this.cityId);
  }
}
