// display-reasons.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RejectionReasonService } from '../../../services/rejectionReason.service';
import {
  PaginatedRejectionReasonResponse,
  RejectionReasonResponse,
} from '../../../models/rejection-reason.model';

@Component({
  selector: 'app-display-reasons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './display-reasons.component.html',
  styleUrls: ['./display-reasons.component.scss'],
})
export class ReasonsComponent implements OnInit {
  reasons: PaginatedRejectionReasonResponse | null = null;
  filteredReasons: RejectionReasonResponse[] = [];
  searchQuery = '';
  loading = false;
  errorMessage = ''; // Property to store error messages
  showConfirmDialog = false;
  reasonToDelete: RejectionReasonResponse | null = null;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private rejectionReasonService: RejectionReasonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReasons();
  }

  get displayRange(): { start: number; end: number; total: number } {
    if (!this.reasons) {
      return { start: 0, end: 0, total: 0 };
    }
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.reasons.totalCount);
    return {
      start: this.reasons.totalCount === 0 ? 0 : start,
      end,
      total: this.reasons.totalCount,
    };
  }

  get totalPages(): number {
    return this.reasons && this.reasons.totalCount
      ? Math.ceil(this.reasons.totalCount / this.pageSize)
      : 1;
  }

  // loadReasons(): void {
  //   this.loading = true;
  //   this.rejectionReasonService
  //     .getAllRejectionReasons(this.currentPage, this.pageSize)
  //     .subscribe({
  //       next: (response) => {
  //         this.reasons = response;
  //         this.filteredReasons = response.data.filter((reason) => !reason.isDeleted);
  //         this.onSearch(); // Apply search filter if any
  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         console.error('Error loading reasons:', err);
  //         this.loading = false;
  //       },
  //     });
  // }

  loadReasons(): void {
    this.loading = true;
    this.rejectionReasonService.getAllRejectionReasons(this.currentPage, this.pageSize).subscribe({
      next: (reasons) => {
        this.reasons = reasons;
        this.filteredReasons = reasons.data.filter((reason) => !reason.isDeleted); // عرض الأسباب الغير محذوفة فقط
        this.loading = false;
      },
      error: (err) => {
        console.error('فشل في تحميل الأسباب:', err);
        this.errorMessage = 'فشل في تحميل الأسباب: ' + (err.message || 'خطأ غير معروف');
        this.loading = false;
      },
    });
  }
  onSearch(): void {
    if (!this.reasons) {
      this.filteredReasons = [];
      return;
    }
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredReasons = query
      ? this.reasons.data.filter(
          (reason) =>
            !reason.isDeleted && reason.text.toLowerCase().includes(query)
        )
      : this.reasons.data.filter((reason) => !reason.isDeleted);
  }

  addReason(): void {
    this.router.navigate(['/reject/add']);
  }



  editReason(id: number): void {
    // this.router.navigate([`/rejection-reasons/edit/${id}`]);
    this.router.navigate([`/reject/edit/${id}`]);
  }

  confirmDeleteReason(reason: RejectionReasonResponse): void {
    this.reasonToDelete = reason;
    this.showConfirmDialog = true;
  }

  deleteReason(id: number): void {
    const reason: RejectionReasonResponse | undefined = this.reasons?.data.find((reason) => reason.id === id);
    if (!reason) {
      this.errorMessage = 'السبب غير موجود';
      return;
    }

    if (reason.isDeleted) {
      this.errorMessage = 'السبب محذوف بالفعل';
      return;
    }

    if (!confirm('هل أنت متأكد من حذف هذا السبب؟')) {
      return;
    }

    console.log('ID المحذوف:', id);
    console.log('الـ List قبل الحذف:', JSON.stringify(this.reasons?.data));
    console.log('filteredReasons قبل الحذف:', JSON.stringify(this.filteredReasons));

    this.loading = true;
    this.errorMessage = '';

    this.rejectionReasonService.deleteRejectionReason(id).subscribe({
      next: (response) => {
        console.log('رد الـ API:', response);
        // حذف السبب من الـ list الأساسية
        if (this.reasons) {
          this.reasons.data = [...this.reasons.data.filter((reason) => reason.id !== id)];
          this.reasons.totalCount = this.reasons.data.length; // تحديث العدد الكلي
        }
        // حذف السبب من filteredReasons
        this.filteredReasons = [...this.filteredReasons.filter((reason) => reason.id !== id)];

        // تحديث الـ pagination
        const totalItems = this.filteredReasons.length;
        const maxPages = Math.ceil(totalItems / this.pageSize);
        if (this.currentPage > maxPages && maxPages > 0) {
          this.currentPage = maxPages; // لو الصفحة الحالية أكبر من عدد الصفحات الجديد، نروح لآخر صفحة
        }
        if (totalItems === 0) {
          this.currentPage = 1; // لو مفيش عناصر، نرجع للصفحة الأولى
        }

        console.log('الـ List بعد الحذف:', JSON.stringify(this.reasons?.data));
        console.log('filteredReasons بعد الحذف:', JSON.stringify(this.filteredReasons));
        console.log('currentPage بعد الحذف:', this.currentPage);
        this.loading = false;
      },
      error: (err) => {
        console.error('تفاصيل الخطأ:', err);
        this.errorMessage = 'فشل في حذف سبب الرفض: ' + (err.status ? `(${err.status}) ${err.statusText}` : 'خطأ غير معروف');
        this.loading = false;
      },
    });
  }
  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.reasonToDelete = null;
  }

  confirmDelete(): void {
    if (this.reasonToDelete && this.reasonToDelete.id) {
      this.loading = true;
      this.rejectionReasonService
        .deleteRejectionReason(this.reasonToDelete.id)
        .subscribe({
          next: () => {
            this.loadReasons(); // Refresh data
            this.showConfirmDialog = false;
            this.reasonToDelete = null;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error deleting reason:', err);
            this.loading = false;
          },
        });
    }
  }

  changePageSize(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    if (newSize !== this.pageSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
      this.loadReasons();
    }
  }

  firstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.loadReasons();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReasons();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReasons();
    }
  }

  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.loadReasons();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadReasons();
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
