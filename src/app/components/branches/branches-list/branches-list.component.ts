import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BranchesService } from '../../../services/branches.service';
import { Branch } from '../../../models/branches.model';

@Component({
  selector: 'app-branches-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss'],
})
export class BranchesListComponent implements OnInit {
  branches = signal<Branch[]>([]);
  filteredBranches = signal<Branch[]>([]);
  searchQuery = signal('');
  loading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  pageSizeOptions = signal([5, 10, 25, 50]);

  constructor(
    private branchesService: BranchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.loading.set(true);
    this.errorMessage.set('');
    this.branchesService
      .getBranches(this.currentPage(), this.pageSize())
      .subscribe({
        next: ({ branches, totalCount }) => {
          this.branches.set(branches);
          this.totalCount.set(totalCount);
          this.filterBranches();
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Error loading branches');
          this.loading.set(false);
        },
      });
  }

  filterBranches(): void {
    const query = this.searchQuery().toLowerCase().trim();
    this.filteredBranches.set(
      this.branches().filter((branch) =>
        branch.name.toLowerCase().includes(query)
      )
    );
  }

  onSearch(): void {
    this.currentPage.set(1); // Reset to first page on search
    this.filterBranches();
  }

  addBranch(): void {
    this.router.navigate(['/branch/add']);
  }

  editBranch(branch: Branch): void {
    this.router.navigate(['/branch/edit', branch.id]);
  }

  deleteBranch(branch: Branch): void {
    if (confirm(`Are you sure you want to delete ${branch.name}?`)) {
      this.branchesService.deleteBranch(branch.id).subscribe({
        next: () => {
          this.loadBranches(); // Reload branches after deletion
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Error deleting branch');
        },
      });
    }
  }

  changePageSize(event: Event | any): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadBranches();
  }

  firstPage(): void {
    if (this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.loadBranches();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadBranches();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadBranches();
    }
  }

  lastPage(): void {
    if (this.currentPage() !== this.totalPages()) {
      this.currentPage.set(this.totalPages());
      this.loadBranches();
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadBranches();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalCount() / this.pageSize());
  }

  displayRange() {
    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(
      this.currentPage() * this.pageSize(),
      this.totalCount()
    );
    return {
      start: this.totalCount() === 0 ? 0 : start,
      end,
      total: this.totalCount(),
    };
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
      if (start > 2) pages.push(-1); // Ellipsis
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push(-1); // Ellipsis
      pages.push(total);
    }

    return pages;
  }
}
