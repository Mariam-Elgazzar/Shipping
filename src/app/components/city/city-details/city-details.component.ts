import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService } from '../../../services/City.service';
// import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-City-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './City-details.component.html',
  styleUrls: ['./City-details.component.scss'],
})
export class CityDetailsComponent implements OnChanges {
  @Input() CityId: string | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  CityDetails: any = null;

  constructor(private cityService: CityService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CityId'] && this.CityId) {
      this.loadCityDetails();
    }
  }

  loadCityDetails(): void {
    if (!this.CityId) return;

    this.cityService.getCityDetails(this.CityId).subscribe(
      (details) => {
        this.CityDetails = details;
      },
      (error) => {
        console.error('Error loading City details:', error);
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
    console.log('Edit City details:', this.CityId);
  }
}
