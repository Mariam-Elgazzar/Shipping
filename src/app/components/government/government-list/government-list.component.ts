import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Government, UpdateGovernmentRequest } from '../../../models/government.interface';
import { GovernmentService } from '../../../services/government.service';
import { GovernmentDetailsComponent } from "../government-details/government-details.component";

@Component({
  selector: 'app-Government-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    GovernmentDetailsComponent
],
  templateUrl: './government-list.component.html',
  styleUrls: ['./government-list.component.scss'],
})
export class GovernmentListComponent implements OnInit {
  Governments: Government[] = [];
  filteredGovernments: Government[] = [];
  selectedGovernments: number[] = [];
  activeActionMenu: number | null = null;
  searchTerm = '';

  selectedGovernmentId: number | null = null;
  isGovernmentDetailsVisible = false;

  constructor(
    private GovernmentService: GovernmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGovernments();

    document.addEventListener('click', (event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    });
  }
  currentPage = 1;
  itemsPerPage = 5;

  get paginatedGovernments(): Government[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredGovernments.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredGovernments.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  loadGovernments(): void {
    this.GovernmentService.getGovernments().subscribe({
      next: (response) => {
        this.Governments = response.data;
        this.filteredGovernments = [...response.data];
      },
      error: (error) => {
        console.error('Error loading Governments:', error);
      },
    });
  }

  filterGovernments(): void {
    if (!this.searchTerm.trim()) {
      this.filteredGovernments = [...this.Governments];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredGovernments = this.Governments.filter((Government) =>
      Government.name.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedGovernments = isChecked
      ? this.filteredGovernments.map((Government) => Government.id)
      : [];
  }

  toggleGovernmentSelection(GovernmentId: number): void {
    const index = this.selectedGovernments.indexOf(GovernmentId);
    if (index === -1) {
      this.selectedGovernments.push(GovernmentId);
    } else {
      this.selectedGovernments.splice(index, 1);
    }
  }

  showActionMenu(GovernmentId: number): void {
    this.activeActionMenu = this.activeActionMenu === GovernmentId ? null : GovernmentId;
  }

  viewGovernmentDetails(GovernmentId: number): void {
    this.selectedGovernmentId = GovernmentId;
    this.isGovernmentDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editGovernment(GovernmentId: number): void {
    // this.router.navigate([`/governments/edit/${GovernmentId}`]);
    this.router.navigate([`/government/${GovernmentId}/update`])
    this.activeActionMenu = null;
  }

  deleteGovernment(GovernmentId: number): void {
    if (confirm('Are you sure you want to delete this Government?')) {
      this.GovernmentService.deleteGovernment(GovernmentId).subscribe({
        next: () => {

          this.router.navigate(['Government/list']);
          this.loadGovernments();

        },
        error: (error) => {
          this.router.navigate(['Government/list']);
          this.loadGovernments();

        },
      });
    }
    this.activeActionMenu = null;
  }

  toggleStatus(Government: Government): void {
    const updatedGovernment: UpdateGovernmentRequest = {
      id: Government.id,
      name: Government.name,
      isDeleted: !Government.isDeleted,
    };

    this.GovernmentService.updateGovernment(updatedGovernment).subscribe({
      next: (response) => {
        const index = this.Governments.findIndex((g) => g.id === Government.id);
        if (index !== -1) {
          this.Governments[index].isDeleted = response.isDeleted;
        }
        const filteredIndex = this.filteredGovernments.findIndex((g) => g.id === Government.id);
        if (filteredIndex !== -1) {
          this.filteredGovernments[filteredIndex].isDeleted = response.isDeleted;
        }
      },
      error: (error) => {
        console.error('Error updating Government status:', error);
      },
    });
  }

  closeGovernmentDetails(): void {
    this.isGovernmentDetailsVisible = false;
    this.selectedGovernmentId = null;
  }
}
