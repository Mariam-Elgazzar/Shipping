import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MerchantService } from '../../../services/merchant.service';
import { MerchantDetailsComponent } from '../merchant-details/merchant-details.component';
import {
  Merchant,
  PaginatedMerchantResponse,
} from '../../../models/merchant.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-merchant-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    MerchantDetailsComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  merchants: PaginatedMerchantResponse | null = null;
  filteredMerchants: Merchant[] = [];
  selectedMerchants: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';
  isLoading = false;
  errorMessage = '';
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  sortColumn: keyof Merchant | '' = '';
  sortDirection: 'asc' | 'desc' | '' = '';
  router: Router = new Router();
  selectedMerchantId: string | null = null;
  isMerchantDetailsVisible = false;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.loadMerchants();
    document.addEventListener('click', (event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    });
  }

  get displayRange(): { start: number; end: number; total: number } {
    if (!this.merchants) {
      return { start: 0, end: 0, total: 0 };
    }
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(
      this.currentPage * this.pageSize,
      this.merchants.totalCount
    );
    return {
      start: this.merchants.totalCount === 0 ? 0 : start,
      end,
      total: this.merchants.totalCount,
    };
  }

  get totalPages(): number {
    return this.merchants && this.merchants.totalCount
      ? Math.ceil(this.merchants.totalCount / this.pageSize)
      : 1;
  }

  loadMerchants(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.merchantService
      .getAllMerchants(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.merchants = response;
          this.filterMerchants();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to load merchants';
          this.isLoading = false;
        },
      });
  }

  filterMerchants(): void {
    if (!this.merchants) {
      this.filteredMerchants = [];
      return;
    }

    let result = [...this.merchants.data];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (merchant) =>
          merchant.phoneNumber.toLowerCase().includes(term) ||
          merchant.name.toLowerCase().includes(term) ||
          merchant.storeName.toLowerCase().includes(term)
      );
    }

    this.filteredMerchants = this.sortData(result);
  }

  sortData(data: Merchant[]): Merchant[] {
    if (!this.sortColumn || !this.sortDirection) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Merchant];
      const bValue = b[this.sortColumn as keyof Merchant];

      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle strings
      const aStr = (aValue || '').toString().toLowerCase();
      const bStr = (bValue || '').toString().toLowerCase();
      return this.sortDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }

  toggleSort(column: keyof Merchant): void {
    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortColumn = '';
        this.sortDirection = '';
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
    this.filterMerchants();
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedMerchants = this.filteredMerchants.map(
        (merchant) => merchant.id
      );
    } else {
      this.selectedMerchants = [];
    }
  }

  toggleMerchantSelection(merchantId: string): void {
    const index = this.selectedMerchants.indexOf(merchantId);
    if (index === -1) {
      this.selectedMerchants.push(merchantId);
    } else {
      this.selectedMerchants.splice(index, 1);
    }
  }

  showActionMenu(merchantId: string): void {
    this.activeActionMenu =
      this.activeActionMenu === merchantId ? null : merchantId;
  }

  viewMerchantDetails(merchantId: string): void {
    this.selectedMerchantId = merchantId;
    this.isMerchantDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editMerchant(merchant: Merchant): void {
    this.router.navigate([`/merchants/edit/${merchant.id}`]);
    this.activeActionMenu = null;
  }

  deleteMerchant(merchantId: string): void {
    if (confirm('Are you sure you want to delete this merchant?')) {
      this.isLoading = true;
      this.errorMessage = '';
      this.merchantService.deleteMerchant(merchantId).subscribe({
        next: () => {
          this.loadMerchants();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Failed to delete merchant';
          this.isLoading = false;
        },
      });
    }
    this.activeActionMenu = null;
  }

  closeMerchantDetails(): void {
    this.isMerchantDetailsVisible = false;
    this.selectedMerchantId = null;
  }

  changePageSize(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    if (newSize !== this.pageSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  firstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.selectedMerchants = [];
      this.loadMerchants();
    }
  }

  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    const total = this.totalPages;

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, this.currentPage - half);
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
