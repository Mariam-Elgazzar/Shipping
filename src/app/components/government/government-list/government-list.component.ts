import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {  GovernmentService } from '../../../services/Government.service';
// import { GovernmentDetailsComponent } from '../Government-details/Government-details.component';
// import { GovernmentService } from '../../../services/Government.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { GovernmentDetailsComponent } from '../government-details/government-details.component';
import { Government, GovernmentService } from '../../../services/government.service';
import { GovernmentDetailsComponent } from '../government-details/government-details.component';

// import { GovernmentDetailsComponent } from '../Government-details/Government-details.component';
// import {  GovernmentService } from '../../../services/Government.service';
// import { GovernmentDetailsComponent } from '../Government-details/Government-details.component';

@Component({
  selector: 'app-Government-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    GovernmentDetailsComponent,
  ],
  templateUrl: './government-list.component.html',
  styleUrls: ['./government-list.component.scss'],
})
export class GovernmentListComponent implements OnInit {
  Governments: Government[] = [];
  filteredGovernments: Government[] = [];
  selectedGovernments: string[] = [];
  activeActionMenu: string | null = null;
  searchTerm = '';

  // For  Government details modal
  selectedGovernmentId: string | null = null;
  isGovernmentDetailsVisible = false;

  constructor(private GovernmentService: GovernmentService) {}

  ngOnInit(): void {
    this.loadGovernments();

    // Close action menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        this.activeActionMenu &&
        !(event.target as HTMLElement).closest('.action-btn')
      ) {
        this.activeActionMenu = null;
      }
    });
  }

  loadGovernments(): void {
    this.GovernmentService.getGovernments().subscribe(
      (data) => {
        this.Governments = data;
        this.filteredGovernments = [...data];
      },
      (error) => {
        console.error('Error loading  Governments:', error);
      }
    );
  }

  filterGovernments(): void {
    if (!this.searchTerm.trim()) {
      this.filteredGovernments = [...this.Governments];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredGovernments = this.Governments.filter(
      (Government) =>
        Government.GovernmentName.toLowerCase().includes(term) ||
        Government.GovernmentName.toLowerCase().includes(term) ||
        Government.cost.toLowerCase().includes(term)
    );
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedGovernments = this.filteredGovernments.map(
        (Government) => Government.id
      );
    } else {
      this.selectedGovernments = [];
    }
  }

  toggleGovernmentSelection(GovernmentId: string): void {
    const index = this.selectedGovernments.indexOf(GovernmentId);

    if (index === -1) {
      this.selectedGovernments.push(GovernmentId);
    } else {
      this.selectedGovernments.splice(index, 1);
    }
  }

  showActionMenu(GovernmentId: string): void {
    this.activeActionMenu =
      this.activeActionMenu === GovernmentId ? null : GovernmentId;
  }

  viewGovernmentDetails(GovernmentId: string): void {
    this.selectedGovernmentId = GovernmentId;
    this.isGovernmentDetailsVisible = true;
    this.activeActionMenu = null;
  }

  editGovernment(GovernmentId: string): void {
    console.log('Edit  Government:', GovernmentId);
    this.activeActionMenu = null;
  }

  deleteGovernment(GovernmentId: string): void {
    if (confirm('Are you sure you want to delete this  Government?')) {
      this.GovernmentService.deleteGovernment(GovernmentId).subscribe(
        () => {
          this.Governments = this.Governments.filter(
            (Government) => Government.id !== GovernmentId
          );
          this.filteredGovernments = this.filteredGovernments.filter(
            (Government) => Government.id !== GovernmentId
          );
        },
        (error) => {
          console.error('Error deleting  Government:', error);
        }
      );
    }
    this.activeActionMenu = null;
  }

  closeGovernmentDetails(): void {
    this.isGovernmentDetailsVisible = false;
    this.selectedGovernmentId = null;
  }
}
