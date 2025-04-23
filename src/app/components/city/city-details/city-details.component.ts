import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CityResponse } from '../../../models/city.model';
import { CityService } from '../../../services/city.service';
import { Router } from '@angular/router';
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

  city: City | null = null;

  constructor(private cityService: CityService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityId'] && this.cityId !== null) {
      this.loadCityDetails();
    }
  }

  loadCityDetails(): void {
    if (this.cityId === null) return;

    this.cityService.getCityDetails(this.cityId).subscribe({
      next: (city) => {
        this.city = city;
      },
      error: (err) => {
        console.error('Failed to load city:', err);
      },
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
    this.city = null;
  }

  onEdit(): void {
    if (this.cityId !== null) {
      this.router.navigate([`/cities/edit/${this.cityId}`]);
      this.onClose();
    }
  }
}
