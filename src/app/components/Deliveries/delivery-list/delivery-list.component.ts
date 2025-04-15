import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DeliveryService } from '../../../services/delivery.service';
import { DeliveryDetailsComponent } from '../delivery-details/delivery-details.component';
import {
  DeliveryResponse,
  PaginatedDeliveryResponse,
} from '../../../models/delivery.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delivery-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatProgressSpinnerModule,
    DeliveryDetailsComponent,
  ],
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent {
  deliveryReps = signal<PaginatedDeliveryResponse | null>(null);
  filteredDeliveryReps = signal<DeliveryResponse[]>([]);
  selectedDeliveryReps = signal<string[]>([]);
  activeActionMenu = signal<string | null>(null);
  searchTerm = signal('');
  isLoading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  pageSizeOptions = signal([5, 10, 25, 50]);
  sortColumn = signal<keyof DeliveryResponse | ''>('');
  sortDirection = signal<'asc' | 'desc' | ''>('');
  selectedDeliveryRepId = signal<string | null>(null);
  isDeliveryDetailsVisible = signal(false);

  constructor(
    private deliveryService: DeliveryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDeliveryReps();
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  private handleDocumentClick(event: MouseEvent): void {
    if (
      this.activeActionMenu() &&
      !(event.target as HTMLElement).closest('.action-btn')
    ) {
      this.activeActionMenu.set(null);
    }
  }

  getUniqueGovernorates(governorates: string[]): string {
    return [...new Set(governorates)].join(', ');
  }

  displayRange = () => {
    if (!this.deliveryReps()) {
      return { start: 0, end: 0, total: 0 };
    }
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(
      this.currentPage() * this.pageSize(),
      this.deliveryReps()!.totalCount
    );
    return {
      start: this.deliveryReps()!.totalCount === 0 ? 0 : start,
      end,
      total: this.deliveryReps()!.totalCount,
    };
  };

  totalPages = () => {
    return this.deliveryReps() && this.deliveryReps()!.totalCount
      ? Math.ceil(this.deliveryReps()!.totalCount / this.pageSize())
      : 1;
  };

  loadDeliveryReps(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.deliveryService
      .getAllDeliveryReps(this.currentPage(), this.pageSize())
      .subscribe({
        next: (response) => {
          this.deliveryReps.set(response);
          this.filterDeliveryReps();
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(
            err.message || 'Failed to load delivery representatives'
          );
          this.isLoading.set(false);
        },
      });
  }

  filterDeliveryReps(): void {
    if (!this.deliveryReps()) {
      this.filteredDeliveryReps.set([]);
      return;
    }

    let result = [...this.deliveryReps()!.data];

    if (this.searchTerm().trim()) {
      const term = this.searchTerm().toLowerCase();
      result = result.filter(
        (rep) =>
          rep.phoneNumber.toLowerCase().includes(term) ||
          rep.name.toLowerCase().includes(term) ||
          rep.email.toLowerCase().includes(term)
      );
    }

    this.filteredDeliveryReps.set(this.sortData(result));
  }

  sortData(data: DeliveryResponse[]): DeliveryResponse[] {
    if (!this.sortColumn() || !this.sortDirection()) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[this.sortColumn() as keyof DeliveryResponse];
      const bValue = b[this.sortColumn() as keyof DeliveryResponse];

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

  toggleSort(column: keyof DeliveryResponse): void {
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
    this.filterDeliveryReps();
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedDeliveryReps.set(
        this.filteredDeliveryReps().map((rep) => rep.id)
      );
    } else {
      this.selectedDeliveryReps.set([]);
    }
  }

  toggleDeliveryRepSelection(repId: string): void {
    const current = this.selectedDeliveryReps();
    const index = current.indexOf(repId);
    if (index === -1) {
      this.selectedDeliveryReps.set([...current, repId]);
    } else {
      this.selectedDeliveryReps.set(current.filter((id) => id !== repId));
    }
  }

  showActionMenu(repId: string): void {
    this.activeActionMenu.set(this.activeActionMenu() === repId ? null : repId);
  }

  viewDeliveryRepDetails(repId: string): void {
    this.selectedDeliveryRepId.set(repId);
    this.isDeliveryDetailsVisible.set(true);
    this.activeActionMenu.set(null);
  }

  editDeliveryRep(rep: DeliveryResponse): void {
    this.router.navigate([`/delivery-reps/edit/${rep.id}`]);
    this.activeActionMenu.set(null);
  }

  deleteDeliveryRep(repId: string): void {
    if (
      confirm('Are you sure you want to delete this delivery representative?')
    ) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.deliveryService.deleteDeliveryRep(repId).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.selectedDeliveryReps.set(
            this.selectedDeliveryReps().filter((id) => id !== repId)
          );
          this.loadDeliveryReps();
        },
        error: (err) => {
          this.errorMessage.set(
            err.message || 'Failed to delete delivery representative'
          );
          this.isLoading.set(false);
        },
      });
    }
    this.activeActionMenu.set(null);
  }

  closeDeliveryDetails(): void {
    this.isDeliveryDetailsVisible.set(false);
    this.selectedDeliveryRepId.set(null);
  }

  changePageSize(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    if (newSize !== this.pageSize()) {
      this.pageSize.set(newSize);
      this.currentPage.set(1);
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
    }
  }

  firstPage(): void {
    if (this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
    }
  }

  lastPage(): void {
    if (this.currentPage() !== this.totalPages()) {
      this.currentPage.set(this.totalPages());
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.selectedDeliveryReps.set([]);
      this.loadDeliveryReps();
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
