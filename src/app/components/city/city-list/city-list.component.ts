import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CityDetailsComponent } from '../city-details/city-details.component';
// import { CityService, PaginatedResponse } from '../../../services/city.service';
import { City } from '../../../models/city.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CityService, PaginatedResponse } from '../../../services/city.service';
// import { CityService, PaginatedResponse } from '../../../services/City.service';

@Component({
  selector: 'app-city-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CityDetailsComponent],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, OnDestroy {
  cities: City[] = [];
  filteredCities: City[] = [];
  selectedCities: number[] = [];
  activeActionMenu: number | null = null;
  searchTerm = '';
  pageIndex = 1;
  pageSize = 100;
  totalCount = 0;

  // For city details modal
  selectedCityId: number | null = null;
  isCityDetailsVisible = false;

  private clickListener!: (event: Event) => void;
  private searchSubject = new Subject<string>();

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.loadCities();

    // Debounce search input
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.pageIndex = 1; // Reset to first page on search
        this.loadCities();
      });

    // Close action menu when clicking outside
    this.clickListener = (event: Event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.clickListener);
    this.searchSubject.complete();
  }

  loadCities(): void {
    this.cityService
      .getCities(this.pageIndex, this.pageSize, this.searchTerm || undefined)
      .subscribe({
        next: (response: PaginatedResponse<City>) => {
          this.cities = response.data;
          this.filteredCities = [...response.data];
          this.totalCount = response.totalCount;
        },
        error: (error) => {
          console.error('Error loading cities:', error);
          alert('Failed to load cities.');
        },
      });
  }

  onSearchChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  filterCities(): void {
    // Client-side filtering (optional, kept for fallback)
    if (!this.searchTerm.trim()) {
      this.filteredCities = [...this.cities];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCities = this.cities.filter(
      (city) =>
        city.governorateName.toLowerCase().includes(term) ||
        city.name.toLowerCase().includes(term) ||
        city.chargePrice.toString().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCities = this.filteredCities.map((city) => city.id);
    } else {
      this.selectedCities = [];
    }
  }

  toggleCitySelection(cityId: number): void {
    const index = this.selectedCities.indexOf(cityId);

    if (index === -1) {
      this.selectedCities.push(cityId);
    } else {
      this.selectedCities.splice(index, 1);
    }
  }

  showActionMenu(cityId: number): void {
    this.activeActionMenu = this.activeActionMenu === cityId ? null : cityId;
  }

  viewCityDetails(cityId: number): void {
    this.selectedCityId = cityId;
    this.isCityDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editCity(cityId: number): void {
    console.log('Edit city:', cityId);
    this.activeActionMenu = null;
  }

  deleteCity(cityId: number): void {
    if (confirm('Are you sure you want to delete this city?')) {
      this.cityService.deleteCity(cityId).subscribe({
        next: () => {
          this.cities = this.cities.filter((city) => city.id !== cityId);
          this.filteredCities = this.filteredCities.filter(
            (city) => city.id !== cityId
          );
        },
        error: (error) => {
          console.error('Error deleting city:', error);
          alert('Failed to delete city.');
        },
      });
    }
    this.activeActionMenu = null;
  }

  closeCityDetails(): void {
    this.isCityDetailsVisible = false;
    this.selectedCityId = null;
  }
}
