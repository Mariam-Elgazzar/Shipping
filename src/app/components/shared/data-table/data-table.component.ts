import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
// import { Component, Input, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class DataTableComponent {
  @Input() title = '';
  @Input() columns: { key: string; label: string; primary?: boolean }[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() selectable = true;

  @Output() rowSelected = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<void>();

  selectedItems: Set<any> = new Set();
  searchQuery = '';
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  // Pagination properties
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // Add these properties for action menu
  @ViewChild('menuTrigger') actionMenu!: MatMenuTrigger;
  @Input() actionPermissions: { [key: string]: string } = {
    view: '',
    edit: '',
    delete: '',
    contact: '',
  };
  @Output() actionView = new EventEmitter<any>();
  @Output() actionEdit = new EventEmitter<any>();
  @Output() actionDelete = new EventEmitter<any>();
  @Output() actionContact = new EventEmitter<any>();

  currentItem: any = null;

  // Add this property to the class
  menuPosition = { x: '0px', y: '0px' };

  // Update the constructor to inject AuthService
  constructor(private authService: AuthService) {}

  // Getter for sorted data
  get sortedData(): any[] {
    if (!this.sortColumn || !this.sortDirection) {
      return this.data;
    }

    return [...this.data].sort((a, b) => {
      const valueA = a[this.sortColumn as string];
      const valueB = b[this.sortColumn as string];

      // Handle different data types
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        // Case insensitive string comparison
        const comparison = valueA
          .toLowerCase()
          .localeCompare(valueB.toLowerCase());
        return this.sortDirection === 'asc' ? comparison : -comparison;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        // Date comparison
        const comparison = valueA.getTime() - valueB.getTime();
        return this.sortDirection === 'asc' ? comparison : -comparison;
      } else {
        // Number or other comparison
        const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      }
    });
  }

  // Getter for paginated data
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(startIndex, startIndex + this.pageSize);
  }

  // Getter for total pages
  get totalPages(): number {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  // Getter for displayed item range
  get displayRange(): { start: number; end: number; total: number } {
    const start =
      this.data.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(
      this.currentPage * this.pageSize,
      this.sortedData.length
    );
    return { start, end, total: this.sortedData.length };
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.paginatedData.forEach((item) => this.selectedItems.add(item));
    } else {
      this.paginatedData.forEach((item) => this.selectedItems.delete(item));
    }
  }

  toggleSelectItem(item: any, event: any): void {
    if (event.target.checked) {
      this.selectedItems.add(item);
    } else {
      this.selectedItems.delete(item);
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.has(item);
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  onFilter(): void {
    this.filter.emit();
  }

  getStatusClass(status: string): string {
    status = status.toLowerCase();
    if (status === 'delivery') return 'status-delivery';
    if (status === 'complete') return 'status-complete';
    if (status === 'pending') return 'status-pending';
    return '';
  }

  sort(columnKey: string): void {
    if (this.sortColumn === columnKey) {
      // Toggle sort direction or clear sort
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortColumn = null;
        this.sortDirection = null;
      }
    } else {
      // Set new sort column and direction
      this.sortColumn = columnKey;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(columnKey: string): string {
    if (this.sortColumn !== columnKey) {
      return 'icon-sort';
    }
    return this.sortDirection === 'asc' ? 'icon-sort-asc' : 'icon-sort-desc';
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  changePageSize(event: any): void {
    this.pageSize = Number.parseInt(event.target.value, 10);
    this.currentPage = 1; // Reset to first page when changing page size
  }

  // Generate page numbers for pagination
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(-1); // -1 represents ellipsis
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis
    }

    // Add last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  // Method to handle row action
  onRowAction(item: any): void {
    this.rowSelected.emit(item);
  }

  // Method to get the primary field key for card view
  getPrimaryFieldKey(): string {
    // First check if any column is marked as primary
    const primaryColumn = this.columns.find((col) => col.primary);
    if (primaryColumn) {
      return primaryColumn.key;
    }

    // Otherwise use the first column
    return this.columns.length > 0 ? this.columns[0].key : '';
  }

  // Method to get the primary field value for card view
  getPrimaryField(item: any): string {
    const key = this.getPrimaryFieldKey();
    return item[key] || 'Item';
  }

  // Replace the openActionMenu method with this:

  // Add methods to handle each action
  handleView(item: any): void {
    this.actionView.emit(item);
  }

  handleEdit(item: any): void {
    this.actionEdit.emit(item);
  }

  handleDelete(item: any): void {
    this.actionDelete.emit(item);
  }

  handleContact(item: any): void {
    this.actionContact.emit(item);
  }

  // Add method to check permissions
  hasPermission(permission: string): boolean {
    if (!permission) return true; // If no permission required, allow access
    return this.authService.hasPermission(permission);
  }
}
