import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { CityDetailsComponent } from '../city-details/city-details.component';
// import { PaginatedCityResponse, CityResponse } from '../../../models/city.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
export interface CityResponse {
  id: number;
  name: string;
  governorateName: string;
  chargePrice: number;
  pickUpPrice: number;
  isDeleted: boolean;
}

export interface PaginatedCityResponse {
  data: CityResponse[];
  totalCount: number;
  page?: number;
  pageSize: number;
}
@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatProgressSpinnerModule,
    CityDetailsComponent,
  ],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, OnDestroy {
  cities = signal<PaginatedCityResponse | null>(null);
  filteredCities = signal<CityResponse[]>([]);
  selectedCities = signal<number[]>([]);
  activeActionMenu = signal<number | null>(null);
  searchTerm = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  pageSizeOptions = signal([5, 10, 25, 50]);
  sortColumn = signal<keyof CityResponse | ''>('');
  sortDirection = signal<'asc' | 'desc' | ''>('');
  selectedCityId = signal<number | null>(null);
  isCityDetailsVisible = signal(false);

  constructor(private cityService: CityService, private router: Router) {}

  ngOnInit(): void {
    this.loadCities();
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (
      this.activeActionMenu() !== null &&
      !(event.target as HTMLElement).closest('.action-btn')
    ) {
      this.activeActionMenu.set(null);
    }
  }

  displayRange = () => {
    if (!this.cities()) {
      return { start: 0, end: 0, total: 0 };
    }
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(
      this.currentPage() * this.pageSize(),
      this.cities()!.totalCount
    );
    return {
      start: this.cities()!.totalCount === 0 ? 0 : start,
      end,
      total: this.cities()!.totalCount,
    };
  };

  totalPages = () => {
    return this.cities() && this.cities()!.totalCount
      ? Math.ceil(this.cities()!.totalCount / this.pageSize())
      : 1;
  };

  loadCities(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.cityService.getCities(this.currentPage(), this.pageSize()).subscribe({
      next: (response) => {
        this.cities.set(response);
        this.filterCities();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load cities');
        this.isLoading.set(false);
      },
    });
  }

  filterCities(): void {
    if (!this.cities()) {
      this.filteredCities.set([]);
      return;
    }

    let result = [...this.cities()!.data];

    if (this.searchTerm().trim()) {
      const term = this.searchTerm().toLowerCase();
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(term) ||
          city.governorateName.toLowerCase().includes(term)
      );
    }

    this.filteredCities.set(this.sortData(result));
  }

  sortData(data: CityResponse[]): CityResponse[] {
    if (!this.sortColumn() || !this.sortDirection()) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[this.sortColumn() as keyof CityResponse];
      const bValue = b[this.sortColumn() as keyof CityResponse];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection() === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      const aStr = (aValue || '').toString().toLowerCase();
      const bStr = (bValue || '').toString().toLowerCase();
      return this.sortDirection() === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }

  toggleSort(column: keyof CityResponse): void {
    if (this.sortColumn() === column) {
      if (this.sortDirection() === 'asc') {
        this.sortDirection.set('desc');
      } else if (this.sortDirection() === 'desc') {
        this.sortColumn.set('');
        this.sortDirection.set('');
      } else {
        this.sortDirection.set('asc');
      }
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1);
    this.filterCities();
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCities.set(this.filteredCities().map((city) => city.id));
    } else {
      this.selectedCities.set([]);
    }
  }

  toggleCitySelection(cityId: number): void {
    const current = this.selectedCities();
    const index = current.indexOf(cityId);
    if (index === -1) {
      this.selectedCities.set([...current, cityId]);
    } else {
      this.selectedCities.set(current.filter((id) => id !== cityId));
    }
  }

  showActionMenu(cityId: number): void {
    this.activeActionMenu.set(
      this.activeActionMenu() === cityId ? null : cityId
    );
  }

  viewCityDetails(cityId: number): void {
    this.selectedCityId.set(cityId);
    this.isCityDetailsVisible.set(true);
    this.activeActionMenu.set(null);
  }

  editCity(cityId: number): void {
    this.router.navigate([`/cities/edit/${cityId}`]);
    this.activeActionMenu.set(null);
  }

  deleteCity(cityId: number): void {
    if (confirm('Are you sure you want to delete this city?')) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.cityService.deleteCity(cityId).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.selectedCities.set(
            this.selectedCities().filter((id) => id !== cityId)
          );
          this.loadCities();
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to delete city');
          this.isLoading.set(false);
        },
      });
    }
    this.activeActionMenu.set(null);
  }

  addCity(): void {
    this.router.navigate(['/cities/add']);
  }

  closeCityDetails(): void {
    this.isCityDetailsVisible.set(false);
    this.selectedCityId.set(null);
  }

  changePageSize(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    if (newSize !== this.pageSize()) {
      this.pageSize.set(newSize);
      this.currentPage.set(1);
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  firstPage(): void {
    if (this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  lastPage(): void {
    if (this.currentPage() !== this.totalPages()) {
      this.currentPage.set(this.totalPages());
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.selectedCities.set([]);
      this.loadCities();
    }
  }

  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    const total = this.totalPages();

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, this.currentPage() - half);
    let end = Math.min(total, start + maxPagesToShow - 1);

    if (end - start + 1 < maxPagesToShow) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push(-1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) {
        pages.push(-1);
      }
      pages.push(total);
    }

    return pages;
  }
}
